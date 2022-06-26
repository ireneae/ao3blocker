var currentBrowser = (typeof chrome != "object")? browser : chrome;

currentBrowser.runtime.onInstalled.addListener(function() {
    currentBrowser.contextMenus.removeAll(function() {
      currentBrowser.contextMenus.create({
        title: "Block author",
        contexts: ["link"],
        id: "addAuthor",
        targetUrlPatterns: ["https://archiveofourown.org/users/*/pseuds/*"]
    });
      currentBrowser.contextMenus.create({
        title: "Block tag",
        contexts: ["link"],
        id: "addTag",
        targetUrlPatterns: ["https://archiveofourown.org/tags/*"]
    });
  });
});

currentBrowser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "addAuthor"){
    currentBrowser.storage.sync.get({'authors': []}, function(result) {
        if (!result.authors.includes(info.linkUrl)) {
          result.authors.push(info.linkUrl);
        }
        currentBrowser.storage.sync.set({'authors': result.authors})
      });
  } else if (info.menuItemId === "addTag"){
    currentBrowser.storage.sync.get({'tags': []}, function(result) {
        if (!result.tags.includes(info.linkUrl)) {
          result.tags.push(info.linkUrl);
        }
        currentBrowser.storage.sync.set({'tags': result.tags})
      });
  }
});

