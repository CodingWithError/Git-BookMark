const manager = new BookmarkManager();

document.getElementById('bookmarkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const repoName = document.getElementById('repoName').value; 
    const repoLink = document.getElementById('repoLink').value;
    const lastAction = document.getElementById('lastAction').value;
    const status = document.getElementById('status').value;

    manager.addBookmark(repoName, repoLink, lastAction, status); 
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
        bookmarkItem.innerHTML = `
            <strong>${index + 1}:</strong><br>
            <strong>Repo Name:</strong> ${bookmark.repoName || 'N/A'}<br>
            <strong>Repo Link:</strong> <a href="${bookmark.repoLink || '#'}" target="_blank">${bookmark.repoLink || 'N/A'}</a><br>
            <strong>Last Action:</strong> ${bookmark.lastAction || 'N/A'}<br>
            <strong>Status:</strong> ${bookmark.status || 'N/A'}<br>
            <button class="deleteButton" data-index="${index}">Delete</button>
        `;
        bookmarkList.appendChild(bookmarkItem); 
    });

    document.getElementById('bookmarkListContainer').style.display = 'block'; 
    document.getElementById('bookmarkFormContainer').style.display = 'none'; 

    
    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            if (confirm('Are you sure you want to delete this bookmark?')) {
                manager.bookmarks.splice(index, 1); 
                displayBookmarks(); 
            }
        });
    });
}

