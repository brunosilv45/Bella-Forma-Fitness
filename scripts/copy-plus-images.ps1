$src = 'C:\Users\Bruno Carvalho\.cursor\projects\c-Users-Bruno-Carvalho-Documents-BellaFormaFitness\assets'
$dst = 'C:\Users\Bruno Carvalho\Documents\BellaFormaFitness\tmp_plus'
if (!(Test-Path -LiteralPath $dst)) { New-Item -ItemType Directory -Path $dst | Out-Null }
$files = Get-ChildItem -Path $src -Filter '*2026-05-12*.png' | Sort-Object Name
$i = 0
foreach ($f in $files) {
  $i++
  $idx = "{0:D3}" -f $i
  $longSrc = '\\?\' + $f.FullName
  $dstPath = Join-Path $dst "p-$idx.png"
  Copy-Item -LiteralPath $longSrc -Destination $dstPath -Force
}
Write-Host "Copiados: $i arquivos para $dst"
