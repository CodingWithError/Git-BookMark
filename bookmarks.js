class Bookmark {
    constructor(repoName, repoLink, lastAction, status) { 
        this.repoName = repoName; 
        this.repoLink = repoLink;
        this.lastAction = lastAction;
        this.status = status;
    }
}

class BookmarkManager {
    constructor() {
        this.bookmarks = [];
        this.loadBookmarks(); 
    }
    addBookmark(repoName, repoLink, lastAction, status) { 
        const newBookmark = new Bookmark(repoName, repoLink, lastAction, status);
        this.bookmarks.push(newBookmark);
        this.saveBookmarks(); 
        console.log('Bookmark added:', newBookmark); 
    }
    displayBookmarks() {
        if (this.bookmarks.length === 0) {
            return 'No bookmarks available.'; 
        }
        return this.bookmarks.map((bookmark, index) => 
            `${index + 1}:\n  Repo Name: ${bookmark.repoName || 'N/A'}\n  Repo Link: ${bookmark.repoLink || 'N/A'}\n  Last Action: ${bookmark.lastAction || 'N/A'}\n  Status: ${bookmark.status || 'N/A'}`
        ).join('\n\n');
    }
    saveBookmarks() {
        chrome.storage.local.set({ bookmarks: this.bookmarks }, () => {
            console.log('Bookmarks saved:', this.bookmarks); 
        });
    }
    loadBookmarks() {
        chrome.storage.local.get('bookmarks', (data) => {
            if (data.bookmarks) {
                this.bookmarks = data.bookmarks;
                console.log('Bookmarks loaded:', this.bookmarks); 
            }
        });
    }
}
