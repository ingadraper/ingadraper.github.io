#!/usr/bin/env python3
"""Bounded publisher for the Inga Draper website.

Enforces the publication contract in HERMES.md. Portable across Linux, macOS,
and Windows; the repository is identified by its Git origin URL rather than by
an absolute filesystem path, so any approved checkout may publish.

Usage:
    python3 scripts/publish_inga_site.py --state <state.json> --message "..." --dry-run
    python3 scripts/publish_inga_site.py --state <state.json> --message "..." --confirm-publish

The state file is JSON: {"baseline": "<sha>", "managed_paths": ["src/editable-site.json"]}
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

EXPECTED_ORIGIN = "https://github.com/ingadraper/ingadraper.github.io.git"
EXPECTED_BRANCH = "main"
ALLOWED_PATHS = ("src/editable-site.json", "docs/link-inventory.md")
PROTECTED_PARTS = {
    ".env", ".git", ".github", "agents.md", "cname", "hermes.md",
    "node_modules", "dist", "package.json", "package-lock.json",
    "npm-shrinkwrap.json", "pnpm-lock.yaml", "yarn.lock",
}
PROTECTED_TERMS = ("credential", "policy", "secret", "token")


class PublishError(RuntimeError):
    """A contract violation. Always fatal; never retried or bypassed."""


def run(args: list[str], cwd: Path | None = None, strip: bool = True) -> str:
    proc = subprocess.run(args, cwd=cwd, capture_output=True, text=True)
    if proc.returncode != 0:
        detail = (proc.stdout + proc.stderr).strip()
        raise PublishError(f"{args[0]} failed with exit {proc.returncode}: {detail}")
    return proc.stdout.strip() if strip else proc.stdout


def git(*args: str, cwd: Path, strip: bool = True) -> str:
    return run(["git", *args], cwd=cwd, strip=strip)


def npm_command() -> str:
    """npm is npm.cmd on Windows and npm elsewhere."""
    for candidate in ("npm.cmd", "npm") if os.name == "nt" else ("npm",):
        found = shutil.which(candidate)
        if found:
            return found
    raise PublishError("npm was not found on PATH.")


def assert_allowed_path(path: str) -> str:
    normalized = path.replace("\\", "/").strip()
    if (
        not normalized
        or normalized.startswith("/")
        or (len(normalized) > 1 and normalized[1] == ":")
        or ".." in normalized.split("/")
    ):
        raise PublishError(f"Invalid managed path: {path}")
    for part in normalized.split("/"):
        folded = part.lower()
        if folded in PROTECTED_PARTS:
            raise PublishError(f"Protected path is denied: {normalized}")
        for term in PROTECTED_TERMS:
            if term in folded:
                raise PublishError(
                    f"Policy, credential, token, and secret paths are denied: {normalized}"
                )
    if normalized not in ALLOWED_PATHS:
        raise PublishError(f"Path is outside the inert website content allowlist: {normalized}")
    return normalized


def status_paths(repo: Path) -> list[str]:
    # Porcelain status is column-significant: the first two characters are the
    # status codes and the third is a space. Never strip this output, or the
    # leading space of the first line is lost and every path loses a character.
    out = git("status", "--porcelain=v1", "--untracked-files=all", cwd=repo, strip=False)
    paths: list[str] = []
    for line in out.splitlines():
        if not line.strip():
            continue
        value = line[3:]
        if " -> " in value:
            raise PublishError("Renames are denied.")
        paths.append(value.replace("\\", "/"))
    return paths


def assert_same(actual: list[str], expected: list[str], message: str) -> None:
    if sorted(set(actual)) != sorted(set(expected)):
        raise PublishError(message)


def split_lines(value: str) -> list[str]:
    return [line for line in value.splitlines() if line.strip()]


def verify_repository(repo: Path) -> None:
    top_level = Path(git("rev-parse", "--show-toplevel", cwd=repo)).resolve()
    if top_level != repo.resolve():
        raise PublishError("Git top-level does not match the publisher's repository root.")
    if git("branch", "--show-current", cwd=repo) != EXPECTED_BRANCH:
        raise PublishError("Branch must be main.")
    if git("remote", cwd=repo) != "origin":
        raise PublishError("Exactly one remote named origin is required.")
    origin = git("remote", "get-url", "origin", cwd=repo)
    if origin.removesuffix(".git") != EXPECTED_ORIGIN.removesuffix(".git"):
        raise PublishError("Origin URL does not match the approved repository.")


def validate_staged_tree(repo: Path, tree: str) -> None:
    """Build an archive of the exact staged tree and prove it compiles."""
    npm = npm_command()
    with tempfile.TemporaryDirectory(prefix="inga-site-validation-") as workdir:
        archive = Path(workdir) / "tree.zip"
        extract = Path(workdir) / "tree"
        git("archive", "--format=zip", f"--output={archive}", tree, cwd=repo)
        with zipfile.ZipFile(archive) as zf:
            zf.extractall(extract)
        run([npm, "ci"], cwd=extract)
        run([npm, "run", "build"], cwd=extract)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--message", required=True, help="One-line commit message.")
    parser.add_argument("--state", required=True, help="Path to the transaction state JSON.")
    parser.add_argument("--confirm-publish", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    repo = Path(__file__).resolve().parent.parent
    verify_repository(repo)

    state_path = Path(args.state)
    if not state_path.is_file():
        raise PublishError("Bounded website transaction state is missing.")
    state = json.loads(state_path.read_text())
    if not state.get("baseline") or not state.get("managed_paths"):
        raise PublishError("Bounded website transaction state is invalid.")

    baseline = str(state["baseline"])
    managed = sorted({assert_allowed_path(str(p)) for p in state["managed_paths"]})
    if not managed:
        raise PublishError("No managed website paths were recorded.")

    if git("rev-parse", "HEAD", cwd=repo) != baseline:
        raise PublishError("HEAD changed after the bounded edit transaction began.")
    if git("diff", "--cached", "--name-only", cwd=repo):
        raise PublishError("The Git index must be clean before publication.")

    changed = status_paths(repo)
    if not changed:
        raise PublishError("There is no bounded website change to publish.")
    for path in changed:
        assert_allowed_path(path)
    assert_same(changed, managed, "Repository changes do not exactly match the managed request paths.")

    git("fetch", "--no-tags", "origin", "main", cwd=repo)
    if git("rev-parse", "origin/main", cwd=repo) != baseline:
        raise PublishError("Fetched origin/main does not equal the transaction baseline.")
    git("diff", "--check", cwd=repo)

    if args.dry_run:
        print(json.dumps({
            "ready": True,
            "dry_run": True,
            "baseline": baseline,
            "managed_paths": managed,
            "validation": ["git diff --check", "npm ci", "npm run build"],
        }, indent=2))
        return 0

    if not args.confirm_publish:
        raise PublishError("Explicit authenticated publication confirmation is required.")

    message = args.message.strip()
    if not 5 <= len(message) <= 120 or "\n" in message or "\r" in message:
        raise PublishError("Commit message must be one line between 5 and 120 characters.")

    git("add", "--", *managed, cwd=repo)
    staged = split_lines(git("diff", "--cached", "--name-only", cwd=repo))
    assert_same(staged, changed, "Explicit staging did not exactly match the bounded changed paths.")
    git("diff", "--cached", "--check", cwd=repo)
    if split_lines(git("diff", "--name-only", cwd=repo)):
        raise PublishError("The worktree changed after explicit staging.")

    validation_tree = git("write-tree", cwd=repo)
    validate_staged_tree(repo, validation_tree)
    if git("write-tree", cwd=repo) != validation_tree:
        raise PublishError("The staged tree changed during validation.")
    if split_lines(git("diff", "--name-only", cwd=repo)):
        raise PublishError("The worktree changed during staged-tree validation.")

    git("commit", "-m", message, cwd=repo)
    committed_head = git("rev-parse", "HEAD", cwd=repo)
    if git("rev-parse", "HEAD^", cwd=repo) != baseline:
        raise PublishError("The publication commit does not have the recorded baseline parent.")
    committed = split_lines(git("diff-tree", "--no-commit-id", "--name-only", "-r", "HEAD", cwd=repo))
    assert_same(committed, managed, "The focused commit does not exactly match the managed paths.")
    if status_paths(repo):
        raise PublishError("The worktree is not clean after the focused commit.")

    git("fetch", "--no-tags", "origin", "main", cwd=repo)
    if git("rev-parse", "origin/main", cwd=repo) != baseline:
        raise PublishError(
            f"origin/main advanced before push; local commit {committed_head} was not pushed."
        )
    git("push", "origin", "main:main", cwd=repo)
    state_path.unlink()

    print(json.dumps({
        "published": True,
        "commit": committed_head,
        "remote": EXPECTED_ORIGIN,
        "refspec": "main:main",
        "validation": ["git diff --check", "npm ci", "npm run build", "git diff --cached --check"],
    }, indent=2))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except PublishError as error:
        print(f"publisher denied: {error}", file=sys.stderr)
        sys.exit(1)
