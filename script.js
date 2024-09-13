const apiKey = '922b892511e22eb0b4ea3a8b6205d767';
const apiUrl = 'https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=10&apikey=' + apiKey;

let currentPage = 1;
const articlesPerPage = 2;
let totalPages;
let articles = [];

const newsGrid = document.getElementById('news-grid');
const pageNumberSpan = document.getElementById('page-number');

// Fetch news articles from GNews API
async function fetchNews() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    articles = data.articles;
    totalPages = Math.ceil(articles.length / articlesPerPage);
    renderNews();
}

function renderNews() {
    newsGrid.innerHTML = '';  

    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const paginatedArticles = articles.slice(start, end);

    paginatedArticles.forEach((article, index) => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('grid-item');

        newsItem.innerHTML = `
            <img src="${article.image || 'https://via.placeholder.com/300x200'}" alt="News Image">
            <div class="content">
                <span class="category ${getCategoryClass(article.source.name)}">${article.source.name}</span>
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available'}</p>
            </div>
        `;
        newsGrid.appendChild(newsItem);
    });
}

function getCategoryClass(sourceName) {
    if (sourceName.toLowerCase().includes('sport')) return 'sports';
    if (sourceName.toLowerCase().includes('entertainment')) return 'entertainment';
    if (sourceName.toLowerCase().includes('technology')) return 'technology';
    return 'general';
}

function updatePageNumber(currentPage) {
    const pageNumbers = document.querySelectorAll('.page-number');
    pageNumbers.forEach((pageNumber) => {
        pageNumber.classList.remove('active');
        if (pageNumber.dataset.page === currentPage.toString()) {
            pageNumber.classList.add('active');
        }
    });
}

function changePage(direction) {
    if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }
    renderNews();
    updatePageNumber(currentPage); 
}

fetchNews();