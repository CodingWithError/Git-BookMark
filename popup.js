const manager = new BookmarkManager();

document.getElementById('bookmarkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const repoLink = document.getElementById('repoLink').value;
    const lastAction = document.getElementById('lastAction').value;
    const status = document.getElementById('status').value;

    manager.addBookmark(repoLink, lastAction, status); 
    this.reset(); 
});

document.getElementById('showBookmarks').addEventListener('click', function() {
    displayBookmarks(); 
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('bookmarkListContainer').style.display = 'none'; 
    document.getElementById('bookmarkFormContainer').style.display = 'block'; 
});

function displayBookmarks() {
    const bookmarkList = document.getElementById('bookmarkList');
    bookmarkList.innerHTML = ''; 

    if (manager.bookmarks.length === 0) {
        bookmarkList.textContent = 'No bookmarks available.'; 
        document.getElementById('bookmarkListContainer').style.display = 'block'; 
        document.getElementById('bookmarkFormContainer').style.display = 'none'; 
        return;
    }

    manager.bookmarks.forEach((bookmark, index) => {
        const bookmarkItem = document.createElement('div');
        bookmarkItem.textContent = `${index + 1}: ${bookmark.repoLink} - Last Action: ${bookmark.lastAction} - Status: ${bookmark.status}`;
        bookmarkList.appendChild(bookmarkItem); 
    });

    document.getElementById('bookmarkListContainer').style.display = 'block'; 
    document.getElementById('bookmarkFormContainer').style.display = 'none'; 
}

