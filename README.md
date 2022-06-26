# AO3 Editor
Allows blocking authors and tags so they will not appear in AO3 search.

## Installation
Click "Code" -> "Download zip". Unzip downloaded file. This has two subfolders, "chrome" and "firefox".
### Chrome
Go to [chrome://extensions/](chrome://extensions/) and turn on developer mode in the upper right. Click "Load unpacked", navigate to the "chrome" directory, and select that folder.
### Firefox
Go to [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox) and click "Load temporary add-on". Navigate to the "firefox" directory and select the manifest.json file.

## Usage
### Blocking tags
In the AO3 search page, right-click on an author/tag and click "Block author"/"Block tag". Refresh the page; it should no longer be visible.
### Unblocking tags
In the extension options (Chrome: right-click extension and click "Options"; Firefox: go to [about:addons](about:addons) and click "Preferences"), delete any lines you no longer want to block and click "Save".