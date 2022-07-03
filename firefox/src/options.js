var currentBrowser = (typeof chrome != "object")? browser : chrome;

const lerp = (a, b, t) => (1 - t) * a + t * b;

function setup() {
    document.getElementById("import").addEventListener("click", function () {
        document.getElementById("importfile").click();
      }, false)
    document.getElementById("export").addEventListener("click", saveCsv, false)
    document.getElementById("save").addEventListener("click", save, false)
    document.getElementById("importfile").addEventListener("change", function(e) {
        console.log(e)
        var fr=new FileReader();
        fr.onload=function(){
            var parsed = JSON.parse(fr.result)
            console.log(parsed)
            currentBrowser.storage.sync.set({'authors': parsed.authors}, function() {
                currentBrowser.storage.sync.set({'tags': parsed.tags}, function() {
                    currentBrowser.storage.sync.set({'works': parsed.works}, function () {
                        restore_options()
                    })
                })
            })
        }           
        fr.readAsText(this.files[0])
    }, false)
}

function restore_options() {
    currentBrowser.storage.sync.get({'authors': [], 'tags': [], 'works': []}, function(result) {
        document.getElementById("authors").value = result.authors.filter(Boolean).join("\n")
        document.getElementById("tags").value = result.tags.filter(Boolean).join("\n")
        document.getElementById("works").value = result.works.filter(Boolean).join("\n")
    })
    document.getElementById('save').addEventListener('click', save)
}

function save() {
    currentBrowser.storage.sync.set({'authors': document.getElementById("authors").value.split("\n").filter(Boolean)}, function() {
        currentBrowser.storage.sync.set({'tags': document.getElementById("tags").value.split("\n").filter(Boolean)}, function() {
            currentBrowser.storage.sync.set({'works': document.getElementById("works").value.split("\n").filter(Boolean)}, function() {
                fade(document.getElementById('savedconf'), 0, 1, function() {
                    setTimeout(function() {
                        fade(document.getElementById('savedconf'), 1, 0, null)
                    }, 500)
                })
            })
        })
    })
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function saveCsv() {
    save()
    currentBrowser.storage.sync.get({'authors': [], 'tags': [], 'works': []}, function(result) {
        var obj = new Object();
        obj.authors = result.authors
        obj.tags = result.tags
        obj.works = result.works
        download("ao3blocker_export.csv", JSON.stringify(obj))
    })
}

function fade(element, a, b, f) {
    let t=0
    const timer = setInterval(function () {
        if (t >= 1) {
            clearInterval(timer)
            if (f) f()
        }
        opacity = lerp(a, b, t)
        element.style.opacity = opacity
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ')'
        t += 0.05
    }, 30)
}

document.addEventListener('DOMContentLoaded', setup)
document.addEventListener('DOMContentLoaded', restore_options);
