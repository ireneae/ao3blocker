var currentBrowser = (typeof chrome != "object")? browser : chrome;

function createCheckbox(parent, id, value, unblocks) {
  const check = document.createElement("input")
  check.setAttribute("type", "checkbox")
  check.setAttribute("id", id)
  check.setAttribute("name", value.url)
  var checked = true
  for (const el of unblocks) {
    if (el === value.url) {
      checked = false
    }
  }
  if (checked) {
    check.setAttribute("checked", checked)
  }
  const label = document.createElement("label")
  label.setAttribute("for", id)
  label.innerHTML = value.title
  parent.appendChild(check)
  parent.appendChild(label)
  parent.innerHTML += "<br />"
}

function setup() {
  currentBrowser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    checkboxes = document.querySelectorAll("input")
    for (const c of checkboxes) {
      document.remove(c)
    }
    currentBrowser.tabs.sendMessage(tabs[0].id, {request: "current_blocks"}, function(response) {
      console.log(response.blocks.works)
      console.log((response.blocks.works ? "true" : "falsy"))
      document.getElementById("works").style.display = response.blocks.works.length? "initial" : "none"
      document.getElementById("authors").style.display = response.blocks.authors.length? "initial" : "none"
      document.getElementById("tags").style.display = response.blocks.tags.length? "initial" : "none"
      document.getElementById("description").innerHTML = 
        (response.blocks.works.length || response.blocks.authors.length || response.blocks.tags.length) ? 
        "Uncheck to show." : "Nothing blocked on this page."

      for (const workId in response.blocks.works) {
        createCheckbox(document.getElementById("works"), "work" + workId, response.blocks.works[workId], response.unblocks.works)
      }
      for (const authorId in response.blocks.authors) {
        createCheckbox(document.getElementById("authors"), "author" + authorId, response.blocks.authors[authorId], response.unblocks.authors)
      }
      for (const tagId in response.blocks.tags) {
        createCheckbox(document.getElementById("tags"), "tag" + tagId, response.blocks.tags[tagId], response.unblocks.tags)
      }
    });
  });

  document.getElementById("update").addEventListener("click", update, false)
  document.getElementById("options").addEventListener("click", options, false)
}

function update() {
  const unblock = {works: [], authors: [], tags: []}
  works = document.getElementById("works").querySelectorAll("input")
  authors = document.getElementById("authors").querySelectorAll("input")
  tags = document.getElementById("tags").querySelectorAll("input")
  for (const work of works) {
    if (work.checked == false) {
      unblock.works.push(work.name)
    }
  }
  for (const author of authors) {
    if (author.checked == false) {
      unblock.authors.push(author.name)
    }
  }
  for (const tag of tags) {
    if (tag.checked == false) {
      unblock.tags.push(tag.name)
    }
  }
  currentBrowser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    currentBrowser.tabs.sendMessage(tabs[0].id, {request: "unblock", unblock: unblock})
  })
  tabs.reload()
}

function options() {
  currentBrowser.runtime.openOptionsPage()
}

document.addEventListener('DOMContentLoaded', setup)