


var siteNameInput = document.getElementById('bookmarkName');
var siteUrlInput = document.getElementById('bookmarkURL');




var bookmarks = [];

loadLocalStorage()
displayBookmarks();

function saveOnLocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function loadLocalStorage() {
    if (localStorage.getItem('bookmarks') != null) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
}

function addBookmark() {
    var bookmark = {
        id: (bookmarks[bookmarks.length - 1]?.id ?? 0) + 1,
        name: siteNameInput.value,
        url: siteUrlInput.value,
    };

    if (!bookmark.name) {
        alert("name not valid")
        return
    }

    if (!isValidUrl(bookmark.url)) {
        alert("url not valid")
        return
    }

    bookmarks.push(bookmark);
    saveOnLocalStorage()
    clearForm();
    displayBookmarks();
}

function clearForm() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

function displayBookmarks() {
    var bookmarkElements = ``;
    for (var i = 0; i < bookmarks.length; i++) {
        bookmarkElements += `<tr>
        <td>${bookmarks[i].id}</td>
        <td>${bookmarks[i].name}</td>
        <td>
            <button onclick="visitUrl('${bookmarks[i].url}');" class="btn btn-visit" data-index="0">
                <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
        </td>
        <td>
            <button onclick="deleteBookmark(${bookmarks[i].id});" class="btn btn-delete pe-2" data-index="0">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
        </td>
    </tr>`
    }
    document.getElementById('tableContent').innerHTML = bookmarkElements;
}

function deleteBookmark(id) {
    bookmarks = bookmarks.filter(bookmark => bookmark.id != id)
    rearrangeIds()
    saveOnLocalStorage()
    displayBookmarks()
}

function rearrangeIds() {
    for (var i = 0; i < bookmarks.length; i++) {
        bookmarks[i].id = i + 1
    }
}

function visitUrl(url) {
    window.open(url);
}

function isValidUrl(url) {
    try {
        return Boolean(new URL(url));
    }
    catch (e) {
        return false;
    }
}