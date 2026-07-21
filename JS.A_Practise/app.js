import { fetchSearchResults, fetchArticleDetails } from './api.js';

// Các phần tử DOM
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const suggestionsBox = document.getElementById('suggestions');
const resultsGrid = document.getElementById('results-grid');
const articleView = document.getElementById('article-view');
const backButton = document.getElementById('back-button');

// Quản lý trạng thái (State)
let currentResults = [];

// Khởi tạo ứng dụng
const initApp = () => {
    searchInput.addEventListener('input', handleInput);
    searchForm.addEventListener('submit', handleSubmit);
    backButton.addEventListener('click', showResultsView);

    // Đóng gợi ý khi click ra ngoài
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) {
            suggestionsBox.innerHTML = '';
        }
    });
};

// --- LOGIC DEBOUNCE 500ms ---
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

// --- XỬ LÝ SỰ KIỆN ---
const handleSearch = async (query) => {
    if (query.length < 3) {
        suggestionsBox.innerHTML = '';
        return;
    }

    try {
        // Chỉ lấy 3 kết quả cho ô suggestion
        const suggestions = await fetchSearchResults(query, 3);
        renderSuggestions(suggestions);
    } catch (error) {
        suggestionsBox.innerHTML = '<div class="error">API connection error</div>';
    }
};

const handleInput = debounce((e) => {
    handleSearch(e.target.value.trim());
}, 500);

const performSearch = async (query) => {
    if (query.length < 3) return;

    suggestionsBox.innerHTML = ''; // Ẩn suggestions
    renderLoading();

    try {
        currentResults = await fetchSearchResults(query, 20);
        renderResults(currentResults);
    } catch (error) {
        resultsGrid.innerHTML = '<div class="error">Failed to load results. Please try again.</div>';
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    performSearch(query);
};

// --- RENDER GIAO DIỆN ---
const renderSuggestions = (suggestions) => {
    suggestionsBox.innerHTML = '';
    if (suggestions.length === 0) return;

    suggestions.forEach(article => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = article.title;
        item.addEventListener('click', () => {
            searchInput.value = article.title;
            suggestionsBox.innerHTML = '';
            // Khi nhấn gợi ý, thực hiện tìm kiếm với từ khóa đó
            performSearch(article.title);
        });
        suggestionsBox.appendChild(item);
    });
};

const renderResults = (results) => {
    resultsGrid.innerHTML = '';

    if (results.length === 0) {
        resultsGrid.innerHTML = '<div class="error">No results found.</div>';
        showResultsView();
        return;
    }

    results.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';

        // Sử dụng ảnh mặc định nếu không có ảnh
        const imgUrl = article.thumbnail ? article.thumbnail.source : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/400px-Wikipedia-logo-v2.svg.png';

        card.innerHTML = `
      <img src="${imgUrl}" alt="${article.title}" loading="lazy">
      <h3>${article.title}</h3>
      <p>${article.extract ? article.extract.substring(0, 100) + '...' : 'No description available'}</p>
    `;
        card.addEventListener('click', () => loadArticle(article.title));
        resultsGrid.appendChild(card);
    });
    showResultsView();
};

const loadArticle = async (title) => {
    showArticleView();

    // Use loading spinner inside article container
    const articleContent = document.getElementById('article-content');
    articleContent.innerHTML = '<div class="spinner">Loading...</div>';

    try {
        const articleData = await fetchArticleDetails(title);

        const imgUrl = articleData.thumbnail ? articleData.thumbnail.source : '';
        const imgTag = imgUrl ? `<img src="${imgUrl}" alt="${articleData.title}" class="article-image">` : '';

        articleContent.innerHTML = `
            <div class="article-header">
                <h2>${articleData.title}</h2>
            </div>
            ${imgTag}
            <div class="article-body">
               <div class="article-extract">
                    ${articleData.extract || 'No content available'}
                </div>
            </div>
        `;
    } catch (error) {
        articleContent.innerHTML = '<div class="error">Error loading article</div>';
    }
};

// --- CHUYỂN ĐỔI MÀN HÌNH ---
const showResultsView = () => {
    resultsGrid.classList.remove('hidden');
    articleView.classList.add('hidden');
};

const showArticleView = () => {
    resultsGrid.classList.add('hidden');
    articleView.classList.remove('hidden');
};

const renderLoading = () => {
    resultsGrid.innerHTML = '<div class="spinner">Loading...</div>';
};

// Chạy ứng dụng
initApp();