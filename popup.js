const manager = new BookmarkManager();

document.getElementById('bookmarkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const repoName = document.getElementById('repoName').value; // Get repo name
    const repoLink = document.getElementById('repoLink').value;
    const lastAction = document.getElementById('lastAction').value;
    const status = document.getElementById('status').value;

    manager.addBookmark(repoName, repoLink, lastAction, status); // Add the bookmark
    this.reset(); // Clear the form
});

document.getElementById('showBookmarks').addEventListener('click', function() {
    displayBookmarks(); // Show bookmarks when the button is clicked
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('bookmarkListContainer').style.display = 'none'; // Hide bookmarks
    document.getElementById('bookmarkFormContainer').style.display = 'block'; // Show form
});

function displayBookmarks() {
    const bookmarkList = document.getElementById('bookmarkList');
    bookmarkList.innerHTML = ''; // Clear previous content

    if (manager.bookmarks.length === 0) {
        bookmarkList.textContent = 'No bookmarks available.'; // Message if no bookmarks
        document.getElementById('bookmarkListContainer').style.display = 'block'; // Show bookmarks container
        document.getElementById('bookmarkFormContainer').style.display = 'none'; // Hide form
        return;
    }

    manager.bookmarks.forEach((bookmark, index) => {
        const bookmarkItem = document.createElement('div');
        // Updated formatting for better readability
        bookmarkItem.innerHTML = `
            <strong>${index + 1}:</strong><br>
            <strong>Repo Name:</strong> ${bookmark.repoName || 'N/A'}<br>
            <strong>Repo Link:</strong> <a href="${bookmark.repoLink || '#'}" target="_blank">${bookmark.repoLink || 'N/A'}</a><br>
            <strong>Last Action:</strong> ${bookmark.lastAction || 'N/A'}<br>
            <strong>Status:</strong> ${bookmark.status || 'N/A'}
        `;
        bookmarkList.appendChild(bookmarkItem); // Append each bookmark to the list
    });

    document.getElementById('bookmarkListContainer').style.display = 'block'; // Show bookmarks container
    document.getElementById('bookmarkFormContainer').style.display = 'none'; // Hide form
}

