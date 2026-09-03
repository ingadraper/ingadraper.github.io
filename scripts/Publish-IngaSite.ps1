[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$CommitMessage,

    [Parameter(Mandatory = $true)]
    [string]$StatePath,

    [switch]$ConfirmPublish,
    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repository = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$expectedOrigin = 'https://github.com/ingadraper/ingadraper.github.io.git'
$expectedBranch = 'main'
$allowedPaths = @('src/editable-site.json', 'docs/link-inventory.md')
$protectedParts = @('.env', '.git', '.github', 'agents.md', 'cname', 'hermes.md', 'node_modules', 'dist', 'package.json', 'package-lock.json', 'npm-shrinkwrap.json', 'pnpm-lock.yaml', 'yarn.lock')
$protectedTerms = @('credential', 'policy', 'secret', 'token')

function Invoke-External {
    param(
        [Parameter(Mandatory = $true)][string]$FilePath,
        [Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments
    )

    $output = & $FilePath @Arguments 2>&1
    if ($LASTEXITCODE -ne 0) {
        $detail = ($output | Out-String).Trim()
        throw "$FilePath failed with exit $LASTEXITCODE`: $detail"
    }
    return @($output)
}

function Invoke-Git {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments)
    return Invoke-External -FilePath 'git.exe' @Arguments
}

function Get-GitText {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments)
    return ((Invoke-Git @Arguments) -join "`n").Trim()
}

function Test-AllowedPath {
    param([Parameter(Mandatory = $true)][string]$Path)

    $normalized = $Path.Replace('\', '/').Trim()
    if (-not $normalized -or $normalized.StartsWith('/') -or $normalized -match '^[A-Za-z]:' -or $normalized.Split('/') -contains '..') {
        throw "Invalid managed path: $Path"
    }
    $foldedParts = @($normalized.Split('/') | ForEach-Object { $_.ToLowerInvariant() })
    foreach ($part in $foldedParts) {
        if ($protectedParts -contains $part) {
            throw "Protected path is denied: $normalized"
        }
        foreach ($term in $protectedTerms) {
            if ($part.Contains($term)) {
                throw "Policy, credential, token, and secret paths are denied: $normalized"
            }
        }
    }
    if ($allowedPaths -cnotcontains $normalized) {
        throw "Path is outside the inert website content allowlist: $normalized"
    }
    return $normalized
}

function Get-StatusPaths {
    $lines = @(Invoke-Git 'status' '--porcelain=v1' '--untracked-files=all')
    $paths = @()
    foreach ($line in $lines) {
        if (-not $line) { continue }
        $value = $line.Substring(3)
        if ($value.Contains(' -> ')) {
            throw 'Renames are denied.'
        }
        $paths += $value.Replace('\', '/')
    }
    return @($paths)
}

function Assert-SamePaths {
    param(
        [Parameter(Mandatory = $true)][string[]]$Actual,
        [Parameter(Mandatory = $true)][string[]]$Expected,
        [Parameter(Mandatory = $true)][string]$Message
    )

    $actualSorted = @($Actual | Sort-Object -Unique)
    $expectedSorted = @($Expected | Sort-Object -Unique)
    if (($actualSorted -join "`n") -cne ($expectedSorted -join "`n")) {
        throw $Message
    }
}

Set-Location -LiteralPath $repository

$expectedRepository = ([IO.Path]::GetFullPath($repository)).TrimEnd([IO.Path]::DirectorySeparatorChar)
$topLevel = ([IO.Path]::GetFullPath((Get-GitText 'rev-parse' '--show-toplevel'))).TrimEnd([IO.Path]::DirectorySeparatorChar)
if ($topLevel -cne $expectedRepository) { throw 'Git top-level does not match the publisher''s repository root.' }
if ((Get-GitText 'branch' '--show-current') -cne $expectedBranch) { throw 'Branch must be main.' }
if (((Get-GitText 'remote' 'get-url' 'origin') -replace '\.git$','') -cne ($expectedOrigin -replace '\.git$','')) { throw 'Origin URL does not match the approved repository.' }
if ((Get-GitText 'remote') -cne 'origin') { throw 'Exactly one remote named origin is required.' }

if (-not (Test-Path -LiteralPath $StatePath -PathType Leaf)) { throw 'Bounded website transaction state is missing.' }
$state = Get-Content -LiteralPath $StatePath -Raw | ConvertFrom-Json
if (-not $state.baseline -or -not $state.managed_paths) { throw 'Bounded website transaction state is invalid.' }
$baseline = [string]$state.baseline
$managedPaths = @($state.managed_paths | ForEach-Object { Test-AllowedPath ([string]$_) } | Sort-Object -Unique)
if (-not $managedPaths.Count) { throw 'No managed website paths were recorded.' }

$head = Get-GitText 'rev-parse' 'HEAD'
if ($head -cne $baseline) { throw 'HEAD changed after the bounded edit transaction began.' }
if (Get-GitText 'diff' '--cached' '--name-only') { throw 'The Git index must be clean before publication.' }
$changedPaths = @(Get-StatusPaths)
if (-not $changedPaths.Count) { throw 'There is no bounded website change to publish.' }
foreach ($path in $changedPaths) { [void](Test-AllowedPath $path) }
Assert-SamePaths -Actual $changedPaths -Expected $managedPaths -Message 'Repository changes do not exactly match the managed request paths.'

[void](Invoke-Git 'fetch' '--no-tags' 'origin' 'main')
if ((Get-GitText 'rev-parse' 'origin/main') -cne $baseline) { throw 'Fetched origin/main does not equal the transaction baseline.' }
[void](Invoke-Git 'diff' '--check')

if ($DryRun) {
    [pscustomobject]@{
        ready = $true
        dry_run = $true
        baseline = $baseline
        managed_paths = $managedPaths
        validation = @('git diff --check', 'npm ci', 'npm run build')
    } | ConvertTo-Json -Depth 4
    exit 0
}

if (-not $ConfirmPublish) { throw 'Explicit authenticated publication confirmation is required.' }
$message = $CommitMessage.Trim()
if ($message.Length -lt 5 -or $message.Length -gt 120 -or $message.Contains("`n") -or $message.Contains("`r")) {
    throw 'Commit message must be one line between 5 and 120 characters.'
}

[void](Invoke-Git 'add' '--' @managedPaths)
$stagedPaths = @((Get-GitText 'diff' '--cached' '--name-only').Split("`n", [System.StringSplitOptions]::RemoveEmptyEntries))
Assert-SamePaths -Actual $stagedPaths -Expected $changedPaths -Message 'Explicit staging did not exactly match the bounded changed paths.'
[void](Invoke-Git 'diff' '--cached' '--check')
$unstagedPaths = @((Get-GitText 'diff' '--name-only').Split("`n", [System.StringSplitOptions]::RemoveEmptyEntries))
if ($unstagedPaths.Count) { throw 'The worktree changed after explicit staging.' }

$validationTree = Get-GitText 'write-tree'
$validationRoot = Join-Path ([IO.Path]::GetTempPath()) ("inga-site-validation-" + [guid]::NewGuid().ToString('N'))
$validationArchive = "$validationRoot.zip"
try {
    [void](Invoke-Git 'archive' '--format=zip' "--output=$validationArchive" $validationTree)
    Expand-Archive -LiteralPath $validationArchive -DestinationPath $validationRoot
    Push-Location $validationRoot
    try {
        [void](Invoke-External -FilePath 'npm.cmd' 'ci')
        [void](Invoke-External -FilePath 'npm.cmd' 'run' 'build')
    } finally {
        Pop-Location
    }
} finally {
    if (Test-Path -LiteralPath $validationArchive) { Remove-Item -LiteralPath $validationArchive -Force }
    if (Test-Path -LiteralPath $validationRoot) { Remove-Item -LiteralPath $validationRoot -Recurse -Force }
}
if ((Get-GitText 'write-tree') -cne $validationTree) { throw 'The staged tree changed during validation.' }
$unstagedPaths = @((Get-GitText 'diff' '--name-only').Split("`n", [System.StringSplitOptions]::RemoveEmptyEntries))
if ($unstagedPaths.Count) { throw 'The worktree changed during staged-tree validation.' }
[void](Invoke-Git 'commit' '-m' $message)
$committedHead = Get-GitText 'rev-parse' 'HEAD'
if ((Get-GitText 'rev-parse' 'HEAD^') -cne $baseline) { throw 'The publication commit does not have the recorded baseline parent.' }
$committedPaths = @((Get-GitText 'diff-tree' '--no-commit-id' '--name-only' '-r' 'HEAD').Split("`n", [System.StringSplitOptions]::RemoveEmptyEntries))
Assert-SamePaths -Actual $committedPaths -Expected $managedPaths -Message 'The focused commit does not exactly match the managed paths.'
if (@(Get-StatusPaths).Count) { throw 'The worktree is not clean after the focused commit.' }

[void](Invoke-Git 'fetch' '--no-tags' 'origin' 'main')
if ((Get-GitText 'rev-parse' 'origin/main') -cne $baseline) {
    throw "origin/main advanced before push; local commit $committedHead was not pushed."
}
[void](Invoke-Git 'push' 'origin' 'main:main')
Remove-Item -LiteralPath $StatePath -Force

[pscustomobject]@{
    published = $true
    commit = $committedHead
    remote = $expectedOrigin
    refspec = 'main:main'
    validation = @('git diff --check', 'npm ci', 'npm run build', 'git diff --cached --check')
} | ConvertTo-Json -Depth 4