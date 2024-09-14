class Bookmark {
    constructor(repoLink, lastAction, status) {
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

    addBookmark(repoLink, lastAction, status) {
        const newBookmark = new Bookmark(repoLink, lastAction, status);
        this.bookmarks.push(newBookmark);
        this.saveBookmarks(); 
        console.log('Bookmark added:', newBookmark); 
    }

    displayBookmarks() {
        if (this.bookmarks.length === 0) {
            return 'No bookmarks available.'; 
        }
        return this.bookmarks.map((bookmark, index) => 
            `${index + 1}: ${bookmark.repoLink} - Last Action: ${bookmark.lastAction} - Status: ${bookmark.status}`
        ).join('\n');
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
