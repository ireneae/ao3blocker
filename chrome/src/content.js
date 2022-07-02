var currentBrowser = (typeof chrome != "object")? browser : chrome;

function shouldRemove(element, blocked) {
    var authors = element.querySelectorAll('[rel="author"]')
    for (const author of authors) {
        for (const blockedAuthor of blocked.authors) {
            if (author == blockedAuthor) {
                return true
            }
        }
    }
    var tags = element.querySelectorAll(".tag")
    for (const tag of tags) {
        for (const blockedTag of blocked.tags) {
            if (tag == blockedTag) {
                return true
            }
        }
    }
    var heading = element.querySelectorAll(".heading")[0].querySelectorAll("a")[0]
    for (const blockedWork of blocked.works) {
        if (heading == blockedWork) {
            return true
        }
    }
    return false
}

currentBrowser.storage.sync.get({'authors': [], 'tags': [], 'works': []}, function(result) {
    var elements = Array.prototype.slice.call(document.body.querySelectorAll(".blurb"));
    for(const element of elements) {
        if (shouldRemove(element, result)) {
            element.style.display = "none"
        }
    }
});