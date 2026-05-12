$src = 'C:\Users\Bruno Carvalho\.cursor\projects\c-Users-Bruno-Carvalho-Documents-BellaFormaFitness\assets'
$dst = 'C:\Users\Bruno Carvalho\Documents\BellaFormaFitness\tmp_arrastao'
if (!(Test-Path -LiteralPath $dst)) { New-Item -ItemType Directory -Path $dst | Out-Null }
$files = Get-ChildItem -Path $src | Where-Object {
  $_.Name -like '*2026-05-12_at_11.26.05*'
} | Sort-Object Name
$i = 0
foreach ($f in $files) {
  $i++
  $idx = "{0:D3}" -f $i
  $longSrc = '\\?\' + $f.FullName
  $dstPath = Join-Path $dst "a-$idx.png"
  Copy-Item -LiteralPath $longSrc -Destination $dstPath -Force
}
Write-Host "Copiados: $i arquivos"
