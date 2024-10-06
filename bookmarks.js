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

    async addBookmark(repoLink, lastAction, status) {
        const repoName = await this.fetchRepoName(repoLink);
        const newBookmark = new Bookmark(repoName, repoLink, lastAction, status);
        this.bookmarks.push(newBookmark);
        this.saveBookmarks();
        console.log('Bookmark added:', newBookmark);
    }

    async fetchRepoName(repoLink) {
        try {
            const response = await fetch(repoLink);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const titleElement = doc.querySelector('meta[property="og:title"]');
            return titleElement ? titleElement.getAttribute('content') : 'Unknown Repository';
        } catch (error) {
            console.error('Error fetching repo name:', error);
            return 'Unknown Repository';
        }
    }

    deleteBookmark(index) {
        this.bookmarks.splice(index, 1); 
        this.saveBookmarks(); 
        console.log('Bookmark deleted at index:', index);
    }

    getSortedBookmarks(option) {
        if (option === 'ongoing') {
            return this.bookmarks.filter(b => b.status === 'ongoing');
        } else if (option === 'on hold') {
            return this.bookmarks.filter(b => b.status === 'on hold');
        }
        return this.bookmarks; 
    }

    displayBookmarks(option = 'all') {
        const bookmarksToDisplay = this.getSortedBookmarks(option);
        if (bookmarksToDisplay.length === 0) {
            return 'No bookmarks available.'; 
        }
        return bookmarksToDisplay.map((bookmark, index) => 
            `${index + 1}:\n  Repo Name: ${bookmark.repoName || 'N/A'}\n  Repo Link: <a href="${bookmark.repoLink || '#'}" target="_blank">${bookmark.repoLink || 'N/A'}</a>\n  Last Action: ${bookmark.lastAction || 'N/A'}\n  Status: ${bookmark.status || 'N/A'}\n  <button class="deleteButton" data-index="${index}">Delete</button>`
        ).join('<br><br>'); 
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
                // Trigger display of bookmarks after loading
                displayBookmarks();
            }
        });
    }
}
