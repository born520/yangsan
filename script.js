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
    container.innerHTML = ''; // 기존 내용을 지웁니다

    feedItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'feed-item';
        
        // 이미지 URL이 있는지 확인
        if (item.enclosure && item.enclosure.link) {
            const img = document.createElement('img');
            img.src = item.enclosure.link;
            img.alt = item.title || 'Feed Image';
            card.appendChild(img);
        }

        const title = document.createElement('h3');
        title.textContent = item.title || 'No Title';

        const description = document.createElement('p');
        description.textContent = item.description || 'No Description';

        card.appendChild(title);
        card.appendChild(description);
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', displayFeed);
