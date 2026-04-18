$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

$nodeRoot = Join-Path $projectRoot ".tools\node-v22.15.0"
$nodeExe = Join-Path $nodeRoot "node.exe"
$npmCmd = Join-Path $nodeRoot "npm.cmd"

if (-not (Test-Path $nodeExe) -or -not (Test-Path $npmCmd)) {
  throw "Portable Node.js is missing at $nodeRoot. Please ask me to reinstall it."
}

$env:Path = "$nodeRoot;$env:Path"
& $npmCmd install --cache .npm-cache
