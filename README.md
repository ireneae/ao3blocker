# AO3 Editor
Allows hiding authors and tags so they will not appear in AO3 search.

## Public Release (1.0.1)
[Install Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/ao3-editor/)

Install Chrome Extension (TBD)

## Latest Release (1.0.1)
You can install the extension manually for the latest updates.
* Click the green "Code" button in the upper right -> "Download zip".
* Unzip downloaded file. This has two subfolders, "chrome" and "firefox".

#### Chrome
* Go to chrome://extensions/ and turn on developer mode in the upper right.
* Click "Load unpacked".
* Navigate to the "chrome" directory, and select that folder.

#### Firefox
* Go to about:debugging#/runtime/this-firefox
* Click "Load temporary add-on".
* Navigate to the "firefox" directory and select the manifest.json file.

## Usage
### Blocking tags
* In the AO3 search page, right-click on an author/tag/work and click "Block author"/"Block tag"/"Block work".
* Refresh the page; it should no longer be visible.

### Unblocking tags
* Go to extension options
    * Chrome: right-click extension and click "Options"
    * Firefox: go to about:addons and click "Preferences"
* Delete any lines you no longer want to block.
* Click "Save".