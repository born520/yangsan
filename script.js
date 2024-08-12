async function fetchRSSFeed(url) {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Failed to fetch RSS feed:", error);
        return [];
    }
}

async function displayFeed() {
    const url = "https://bg.raindrop.io/rss/public/29968199";
    const feedItems = await fetchRSSFeed(url);
    const container = document.getElementById('feed-container');
    feedItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'feed-item';
        
        const img = document.createElement('img');
        img.src = item.enclosure.link || item.thumbnail;
        img.alt = item.title;
        
        const title = document.createElement('h3');
        title.textContent = item.title;
        
        const description = document.createElement('p');
        description.textContent = item.description;
        
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
        
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', displayFeed);
