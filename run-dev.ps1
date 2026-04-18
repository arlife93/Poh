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

$envLocal = Join-Path $projectRoot ".env.local"
$envExample = Join-Path $projectRoot ".env.local.example"
if (-not (Test-Path $envLocal) -and (Test-Path $envExample)) {
  Copy-Item -Path $envExample -Destination $envLocal
  Write-Host "Created .env.local from .env.local.example. Update values when ready." -ForegroundColor Yellow
}

if (-not (Test-Path (Join-Path $projectRoot "node_modules"))) {
  & $npmCmd install --cache .npm-cache
}

& $npmCmd run dev -- --host 0.0.0.0 --port 5173
