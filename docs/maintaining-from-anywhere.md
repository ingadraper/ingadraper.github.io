# Maintaining this site from anywhere

The canonical source is GitHub:

`https://github.com/ingadraper/ingadraper.github.io`

The repository owner is `ingadraper`. Thor maintains it as an authorized collaborator with push access; it is intentionally not part of `Thor-DraperJr`'s owned-repository inventory.

## First setup on a machine

```bash
gh repo clone ingadraper/ingadraper.github.io ~/src/ingadraper.github.io
cd ~/src/ingadraper.github.io
git config user.name "Thor Draper Jr"
git config user.email "thordraper2@outlook.com"
npm ci
npm run build
```

Use the equivalent checkout path on Windows or another host. The publisher identifies the repository by its `origin` URL, not by a machine-specific path. Do not copy tokens, `.env` files, or `node_modules` between machines.

## Normal human update

Start every session from the remote and keep unrelated work out of the checkout:

```bash
cd ~/src/ingadraper.github.io
git switch main
git pull --ff-only origin main
git switch -c content/short-description
# edit, then validate
npm ci
npm run build
git add <intended-files>
git commit -m "content: describe the change"
git push -u origin HEAD
```

Review the change before merging it to `main`. A push to `main` is a production deployment through GitHub Pages, so use a pull request for normal source, layout, or workflow changes. Never force-push `main`.

## Bounded website-agent update

The authenticated `inga-site` route may use the protected publisher for the two inert allowlisted files only:

- `src/editable-site.json`
- `docs/link-inventory.md`

The transaction state JSON must live outside the Git checkout. Begin it from a clean checkout at the fetched `origin/main` SHA, record exactly the requested managed paths, make the bounded edit, then run one of:

```bash
python3 scripts/publish_inga_site.py \
  --state /absolute/path/outside/repo/state.json \
  --message "content: update approved website data" \
  --dry-run

python3 scripts/publish_inga_site.py \
  --state /absolute/path/outside/repo/state.json \
  --message "content: update approved website data" \
  --confirm-publish
```

The PowerShell equivalent is `scripts/Publish-IngaSite.ps1`. It enforces the same origin, branch, clean-index, exact-path, non-force-push, staged-tree build, and explicit-confirmation checks.

If any guard denies the operation, stop. Do not reset, stash, clean, bypass the publisher, or switch to another account/profile. Resolve the checkout or request boundary instead.

## Deployment and rollback

GitHub Actions builds with the committed lockfile and deploys `dist` to GitHub Pages on a successful push to `main`. The repository is the editable source; `dist` and `node_modules` are generated and ignored. Keep GitHub Pages as the publication authority and verify the public site after production changes. Roll back a bad deployment by reverting the responsible commit through the normal reviewed Git workflow.
