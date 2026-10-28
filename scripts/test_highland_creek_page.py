"""Comps-first presentation contracts, separate from county refresh logic tests."""
from pathlib import Path
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]

class PageTests(unittest.TestCase):
    def test_no_dated_dashboard_or_manual_examples(self):
        page = (ROOT / 'src/pages/highland-creek.astro').read_text(encoding='utf-8')
        component = (ROOT / 'src/components/HighlandCreekComps.astro').read_text(encoding='utf-8')
        for obsolete in ('campaign-stats', 'section="market"', 'market.sales', 'faqSchema', 'THINKING ABOUT SELLING', 'More sale examples'):
            self.assertNotIn(obsolete, page)
        for obsolete in ('MLS market context', 'mlsContext', 'two additional sale examples', 'hc-metrics'):
            self.assertNotIn(obsolete, component)

    def test_single_review_and_required_lookup_disclosures(self):
        page = (ROOT / 'src/pages/highland-creek.astro').read_text(encoding='utf-8')
        component = (ROOT / 'src/components/HighlandCreekComps.astro').read_text(encoding='utf-8')
        self.assertEqual(1, (page + component).count('id="home-review"'))
        self.assertEqual(1, (page + component).count('id="hc-draft"'))
        for identifier in ('hc-address', 'hc-options', 'hc-results', 'hc-cards', 'hc-question', 'hc-result-status'):
            self.assertIn(f'id="{identifier}"', component)
        for disclosure in ('County snapshot:', 'not an appraisal or a price estimate', 'How these sales are chosen', 'How we use the data', 'Nothing is sent'):
            self.assertIn(disclosure, component)
        self.assertIn('highlandcreek.com/community-info/', page)

    def test_question_survives_address_reset_and_invalid_submit(self):
        component = (ROOT / 'src/components/HighlandCreekComps.astro').read_text(encoding='utf-8')
        functions = component.split('    function clearResults() {')[1].split('    function sourceLink(')[0]
        submit = component.split("form.addEventListener('submit',event => {")[1].split('\n    });')[0]
        script = r"""
const assert = require('node:assert/strict');
const question = 'Please review roof & kitchen updates';
const fallback = new URL('mailto:review@example.test?subject=Home%20Review');
fallback.searchParams.set('body', 'Property address (optional):\r\nWhat I would like to understand:');
const root = {dataset:{reviewHref:fallback.href, email:'review@example.test'}};
const empty = {replaceChildren(){}};
const draft = {href:'', setAttribute(name,value){this[name]=value;}};
const elements = {'hc-subject':empty, 'hc-draft':draft, 'hc-question':{value:question}};
const get = id => elements[id];
const results = {hidden:false}, cards = empty;
const address = '5601 SWANSTON DR';
let selected = {address};
FUNCTIONS
function checkFallback() {
    assert.equal(elements['hc-question'].value, question);
    const body = new URL(draft.href).searchParams.get('body');
    assert.ok(body.includes(question), 'question typed before address change must remain in draft');
    assert.ok(body.includes('Property address (optional):'));
    assert.ok(!body.includes(address), 'cleared address must not remain in draft');
    assert.equal(results.hidden, true);
}
updateDraft();
assert.ok(new URL(draft.href).searchParams.get('body').includes(address));
clearResults(); // Address edit/clear, with no second question input event.
checkFallback();
selected = {address};
updateDraft();
const input = {value:'invalid address', setAttribute(){}, focus(){}};
const status = {}, county = {properties:[]};
const matchAddress = () => null, closeOptions = () => {};
const event = {preventDefault(){}};
function choose(){throw Error('invalid address must not be selected');}
function invalidSubmit(){SUBMIT}
invalidSubmit(); // Invalid submission, with the original question still untouched.
checkFallback();
""".replace('FUNCTIONS', 'function clearResults() {' + functions).replace('SUBMIT', submit)
        result = subprocess.run(['node', '-e', script], cwd=ROOT, capture_output=True, text=True)
        self.assertEqual(0, result.returncode, result.stdout + result.stderr)

if __name__ == '__main__':
    unittest.main()
