"""Distinct county refresh and exact-publication contracts (stdlib only)."""
import contextlib
import copy
import datetime as dt
import io
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest
from unittest.mock import patch

import refresh_highland_creek as refresh


class RefreshTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(dir=__import__('os').environ.get('TMPDIR'))
        self.addCleanup(self.tmp.cleanup)
        self.path = Path(self.tmp.name) / 'market.json'
        self.doc = json.loads(Path(refresh.DATA).read_text(encoding='utf-8'))
        self.path.write_text(json.dumps(self.doc), encoding='utf-8')
        self.addCleanup(patch.stopall)
        patch.object(refresh, 'DATA', str(self.path)).start()
        self.ms = int(dt.datetime(2026, 10, 21, tzinfo=dt.timezone.utc).timestamp() * 1000)
        self.rows = [dict(parcelid=f'{i:08}', transferid=i, saleprice=400000, saledate=self.ms,
                          soldasvacantflag='No', deeddescription='WARRANTY DEED', salesvalidity=None,
                          naldesc=None, landusefulldescription='SINGLE FAMILY') for i in range(20)]
        self.parcels = [dict(parcelid=r['parcelid'], address=f'{i} TEST ST CHARLOTTE NC',
                             loccity='CHARLOTTE', state='NC', yearbuilt=2000, heatedarea=2000,
                             bedrooms=3, fullbath=2, halfbath=0, gisacres=.2,
                             xcoord=35.37, ycoord=-80.76) for i, r in enumerate(self.rows)]

    def source(self, path, **params):
        if 'outStatistics' in params:
            return {'features': [{'attributes': {'m': self.ms}}]}
        if path == refresh.SUBDIVS:
            return {'features': [{'attributes': {'name': 'SFR'}, 'geometry': {
                'rings': [[[0, 0], [1, 0], [1, 1], [0, 0]]]}} for _ in range(20)],
                'spatialReference': {'latestWkid': 2264}}
        return {'features': [{'attributes': copy.deepcopy(r)} for r in (
            self.rows if path == refresh.SALES else self.parcels)]}

    def run_refresh(self):
        with patch.object(refresh, 'q', side_effect=self.source), contextlib.redirect_stdout(io.StringIO()) as out:
            refresh.main()
        return out.getvalue()

    def test_county_only_change_no_change_and_property_correction(self):
        self.assertIn('CHANGED=true', self.run_refresh())
        first = self.path.read_bytes()
        updated = json.loads(first)
        for key in self.doc:
            if key != 'countyComps':
                self.assertEqual(self.doc[key], updated[key])
        self.assertEqual(self.doc['countyComps']['properties'], updated['countyComps']['properties'])
        self.assertIn('CHANGED=false', self.run_refresh())
        self.assertEqual(first, self.path.read_bytes())
        self.parcels[0]['heatedarea'] += 10
        self.assertIn('CHANGED=true', self.run_refresh())
        self.assertEqual(2010, json.loads(self.path.read_bytes())['countyComps']['sales'][0]['heatedSqFt'])

    def test_order_is_independent_of_response_and_transaction_ties(self):
        self.rows.append(dict(self.rows[0], transferid=100))
        self.run_refresh()
        first = self.path.read_bytes()
        self.rows.reverse()
        self.parcels.reverse()
        self.assertIn('CHANGED=false', self.run_refresh())
        self.assertEqual(first, self.path.read_bytes())

    def test_incomplete_or_invalid_records_fail_without_writing(self):
        before = self.path.read_bytes()
        del self.parcels[0]['heatedarea']
        with self.assertRaises((ValueError, RuntimeError)):
            self.run_refresh()
        self.assertEqual(before, self.path.read_bytes())

    def test_county_text_coordinates_normalize_but_invalid_values_fail_closed(self):
        self.parcels[0]['xcoord'] = '35.37'
        self.parcels[0]['ycoord'] = '-80.76'
        self.assertIn('CHANGED=true', self.run_refresh())
        first = self.path.read_bytes()
        self.assertEqual(35.37, json.loads(first)['countyComps']['sales'][0]['latitude'])
        self.parcels[0]['xcoord'] = 'NaN'
        with self.assertRaises(ValueError):
            self.run_refresh()
        self.assertEqual(first, self.path.read_bytes())

    def test_query_rejects_partial_and_invalid_responses_and_propagates_errors(self):
        for response in ({}, {'features': [] , 'exceededTransferLimit': True},
                         {'features': [{'attributes': None}]}, {'error': {'message': 'source failed'}},
                         {'features': [], 'count': 1}):
            with self.subTest(response=response), patch.object(refresh.urllib.request, 'urlopen',
                    side_effect=[io.StringIO(json.dumps({'objectIdFieldName': 'objectid', 'objectIds': [1]})),
                                 io.StringIO(json.dumps(response))]):
                with self.assertRaises((ValueError, RuntimeError)):
                    refresh.q(refresh.SALES, where='1=1')
        with patch.object(refresh.urllib.request, 'urlopen', side_effect=OSError('real failure')):
            with self.assertRaisesRegex(OSError, 'real failure'):
                refresh.q(refresh.SALES, where='1=1')

    def test_embedded_payload_requires_all_county_facts_and_criteria(self):
        payload = copy.deepcopy({'county': self.doc['countyComps'], 'criteria': self.doc['comparisonCriteria']})
        html = '<script id="hc-public-data" type="application/json">' + json.dumps(payload) + '</script>'
        refresh.verify_payload(html, self.doc)
        payload['county']['sales'][0]['heatedSqFt'] += 1
        with self.assertRaisesRegex(ValueError, 'payload'):
            refresh.verify_payload('<script id="hc-public-data">' + json.dumps(payload) + '</script>', self.doc)
        with self.assertRaises(ValueError):
            refresh.verify_payload('<time>2026-10-21</time>', self.doc)

    def test_query_reconciles_exact_objectids_without_spatial_count(self):
        calls = []

        def county(request, **kwargs):
            params = refresh.urllib.parse.parse_qs(request.data.decode())
            calls.append(params)
            self.assertNotIn('returnCountOnly', params)
            if params.get('returnIdsOnly') == ['true']:
                result = {'objectIdFieldName': 'objectid', 'objectIds': [7, 9]}
            else:
                self.assertIn('objectid', params['outFields'][0].split(','))
                result = {'features': [{'attributes': {'objectid': oid, 'parcelid': '123'}}
                                       for oid in self.returned_ids]}
            return io.StringIO(json.dumps(result))

        self.returned_ids = [9, 7]
        with patch.object(refresh.urllib.request, 'urlopen', side_effect=county):
            result = refresh.q(refresh.SALES, where='1=1', geometry='{}', outFields='parcelid')
            self.assertEqual(2, len(result['features']))
            self.assertEqual(2, len(calls))
            self.returned_ids = [7, 8]  # Same count is not proof of completeness.
            with self.assertRaisesRegex(ValueError, 'object'):
                refresh.q(refresh.SALES, where='1=1', geometry='{}', outFields='parcelid')

    def test_workflow_origin_accepts_only_exact_approved_https_spellings(self):
        workflow = Path('.github/workflows/highland-creek-refresh.yml').read_text(encoding='utf-8')
        baseline = workflow.split('      - name: Check baseline and county contracts\n', 1)[1]
        guard = baseline.split('          test "$(git remote)" = origin\n', 1)[1].split(
            '          test -z "$(git status --porcelain)"', 1)[0]
        self.assertIn('$(git remote get-url origin)', guard)
        guard = guard.replace('$(git remote get-url origin)', '${HC_TEST_ORIGIN}')
        bash = shutil.which('bash')
        assert bash is not None, 'Bash is required to exercise the workflow guard'
        approved = 'https://github.com/ingadraper/ingadraper.github.io'
        for origin, accepted in ((approved, True), (approved + '.git', True),
                                 ('https://github.com/other/ingadraper.github.io', False),
                                 (approved + '-other', False),
                                 (approved.replace('https:', 'http:'), False)):
            with self.subTest(origin=origin):
                result = subprocess.run([bash, '-e', '-o', 'pipefail', '-c', guard],
                                        env=dict(os.environ, HC_TEST_ORIGIN=origin), capture_output=True)
                self.assertEqual(accepted, result.returncode == 0, result.stderr.decode())

    def test_deployment_requires_latest_exact_sha_and_success(self):
        sha = 'a' * 40
        with patch.object(refresh.subprocess, 'check_output', side_effect=[
                json.dumps([{'id': 42, 'sha': sha}]), json.dumps([{'state': 'success'}])]):
            refresh.verify_deployment(sha)
        with patch.object(refresh.subprocess, 'check_output', return_value=json.dumps([
                {'id': 42, 'sha': 'b' * 40}])):
            with self.assertRaisesRegex(ValueError, 'exact candidate SHA'):
                refresh.verify_deployment(sha)
        with patch.object(refresh.subprocess, 'check_output', side_effect=[
                json.dumps([{'id': 42, 'sha': sha}]), json.dumps([{'state': 'failure'}])]):
            with self.assertRaisesRegex(ValueError, 'not successful'):
                refresh.verify_deployment(sha)


if __name__ == '__main__':
    unittest.main()
