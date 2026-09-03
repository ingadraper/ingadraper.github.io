# Inga Website Agent

This repository is the public website for Inga Draper. Hermes requests arriving through the dedicated authenticated `inga-site` Discord route may edit only public website content and design files through the private profile's `website` tools.

## Authority

- Accept bounded website requests only from the Discord route's exact private sender allowlist.
- Work only inside an approved checkout of this repository and only through the `website` toolset. An approved checkout is any clone whose Git top-level matches the publisher's own repository root and whose single `origin` remote is `https://github.com/ingadraper/ingadraper.github.io.git`. The checkout's filesystem path and host machine are not themselves authority.
- Read or edit only the inert allowlisted files `src/editable-site.json` and `docs/link-inventory.md`.
- Keep private information, credentials, tokens, and unpublished personal details out of repository files and responses.
- Preserve existing site conventions and unrelated content.
- An authenticated bounded edit request in `inga-site` authorizes the complete transaction: edit, validate, create one focused commit, and normally push that commit to `origin/main`. Set the publisher's explicit confirmation flag only for such a request.

## Denied Surfaces

Never request or use terminal, shell, generic file access, arbitrary code execution, browser automation, Git, dependency management, workflows, secrets, account controls, or machine administration. Never edit package manifests or lockfiles, `.github/`, workflows, CNAME files, policy or agent files, this file, `scripts/`, credentials, secrets, generated `dist/`, dependencies, Git metadata, or anything outside this repository.

If a tool or publisher denies an operation, report the denial and stop. Do not seek a bypass.

## Publication Contract

The `website_publish` tool may invoke only a protected repository publisher. Two equivalent implementations are maintained and both enforce the identical contract:

- `scripts/publish_inga_site.py` — portable, runs anywhere Python 3.11+, Git, and Node are available. Use this by default.
- `scripts/Publish-IngaSite.ps1` — PowerShell, retained for Windows hosts that already invoke it.

The publisher must require all of the following before a normal `git push origin main:main`:

1. Git top-level equal to the publisher's own repository root, branch `main`, exactly one remote named `origin`, and origin URL `https://github.com/ingadraper/ingadraper.github.io.git`. Identity comes from the remote, not from an absolute path, so any approved clone on any machine may publish.
2. A clean index and a transaction that began from an exactly clean worktree after fetching `origin/main` and proving local `HEAD` equals the fetched remote head.
3. Only transaction-managed `src/editable-site.json` or `docs/link-inventory.md`; executable source, styles, and all other protected surfaces remain denied.
4. `git diff --check` and `git diff --cached --check` succeed, then `npm ci` and `npm run build` validate an archive of the exact staged Git tree.
5. Explicit staging of exactly the managed changed paths and exactly one focused commit.
6. A second fetch proves `origin/main` still equals the transaction baseline immediately before a normal, non-force push.
7. The worktree is clean after the commit. Never force, stash, reset, clean, amend, rebase, or push any other refspec.
