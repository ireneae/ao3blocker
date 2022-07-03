var currentBrowser = (typeof chrome != "object")? browser : chrome;

var blocks = {works: [], authors: [], tags: []}
var unblocks = {works: [], authors: [], tags: []}

function hasUrl(list, value) {
    for (const el of list) {
        if (el.url === value) {
            return true;
        }
    }
    return false
}

function shouldRemove(element, blocked, unblocked) {
    var remove = false
    var authors = element.querySelectorAll('[rel="author"]')
    for (const author of authors) {
        for (const blockedAuthor of blocked.authors) {
            if (!unblocked.authors.includes(blockedAuthor) && author == blockedAuthor) {
                if (!hasUrl(blocks.authors, blockedAuthor)) {
                    blocks.authors.push({title: author.text, url:blockedAuthor})
                }
                remove = true
            }
        }
    }
    var tags = element.querySelectorAll(".tag")
    for (const tag of tags) {
        for (const blockedTag of blocked.tags) {
            if (!unblocked.tags.includes(blockedTag) && tag == blockedTag) {
                if (!hasUrl(blocks.tags, blockedTag)) {
                    blocks.tags.push({title: tag.text, url:blockedTag})
                }
                remove = true
            }
        }
    }
    var title = element.querySelectorAll(".heading")[0].querySelectorAll("a")[0]
    for (const blockedWork of blocked.works) {
        if (!unblocked.works.includes(blockedWork) && title == blockedWork) {
            if (!hasUrl(blocks.works, blockedWork)) {
                blocks.works.push({title:title.text, url:blockedWork})
            }
            remove = true
        }
    }
    return remove
}

function hideWorks(blocked, unblocked = {works: [], authors: [], tags: []}) {
    var elements = Array.prototype.slice.call(document.body.querySelectorAll(".blurb"));
    for(const element of elements) {
        if (shouldRemove(element, blocked, unblocked)) {
            element.style.display = "none"
        } else {
            element.style.display = "block"
        }
    }
}

currentBrowser.storage.sync.get({'authors': [], 'tags': [], 'works': []}, function(result) {
    hideWorks(result)
});

currentBrowser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.request === "current_blocks") {
      sendResponse({blocks: blocks, unblocks: unblocks});
    } else if (request.request === "unblock") {
        currentBrowser.storage.sync.get({'authors': [], 'tags': [], 'works': []}, function(result) {
            unblocks = request.unblock
            hideWorks(result, unblocks)
        })
    }
  }
);