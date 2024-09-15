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
    document.getElementById('sortOptions').style.display = 'block'; 
    document.getElementById('bookmarkListContainer').style.display = 'block'; 
    document.getElementById('bookmarkFormContainer').style.display = 'none'; 
});

document.getElementById('sortOptions').addEventListener('change', function() {
    const selectedOption = this.value;
    displayBookmarks(selectedOption); 
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('bookmarkListContainer').style.display = 'none'; 
    document.getElementById('bookmarkFormContainer').style.display = 'block'; 
});

function displayBookmarks(option = 'all') {
    const bookmarksDisplay = manager.displayBookmarks(option); 
    document.getElementById('bookmarkList').innerHTML = bookmarksDisplay; 

    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            if (confirm('Are you sure you want to delete this bookmark?')) {
                manager.deleteBookmark(index); 
                alert('Bookmark deleted successfully!'); 
                displayBookmarks(option); 
            }
        });
    });
}

