if ($env:APPVEYOR -eq "True") {
  $external = "$env:APPVEYOR_BUILD_FOLDER\external"
  New-Item $external -ItemType Directory

  $file = "icu4c-win.zip"
  $location = "$external\icu4c-win.zip"
  $unpacked = "$external\icu"

  if (Test-Path $location) {
    Write-Debug "Found cached dependency, skipping..."
    if (Test-Path $unpacked) {
      Remove-Item  $unpacked -Recurse -Force
    }
  } else {
    appveyor DownloadFile $env:icu_download -FileName $location
  }


  push-location $external
  7z x $file
  pop-location
} else {
  Write-Warning "This script is not intended to be run on a developer's machine"
}