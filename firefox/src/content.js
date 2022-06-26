var currentBrowser = (typeof chrome != "object")? browser : chrome;

function shouldRemove(element, blockedAuthors, blockedTags) {
    var authors = element.querySelectorAll('[rel="author"]')
    for (const author of authors) {
        for (const blockedAuthor of blockedAuthors) {
            if (author == blockedAuthor) {
                return true
            }
        }
    }
    var tags = element.querySelectorAll(".tag")
    for (const tag of tags) {
        for (const blockedTag of blockedTags) {
            if (tag == blockedTag) {
                return true
            }
        }
    }
    return false
}

currentBrowser.storage.sync.get({'authors': [], 'tags': []}, function(result) {
    var elements = Array.prototype.slice.call(document.body.querySelectorAll(".blurb"));
    for(const element of elements) {
        if (shouldRemove(element, result.authors, result.tags)) {
            element.style.display = "none"
        }
    }
});