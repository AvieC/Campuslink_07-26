const BASE_URL = 'https://en.wikipedia.org/w/api.php';

// Hàm helper để tạo URL với các tham số chung
const buildUrl = (params) => {
    const url = new URL(BASE_URL);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
};

export const fetchSearchResults = async (query, limit = 20) => {
    const params = {
        action: 'query',
        generator: 'search',
        gsrsearch: query,
        gsrlimit: limit,
        prop: 'pageimages|extracts',
        exintro: true,
        explaintext: true,
        exlimit: 'max',
        format: 'json',
        origin: '*'
    };

    try {
        const response = await fetch(buildUrl(params));
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // Trả về mảng các bài viết hoặc mảng rỗng nếu không có kết quả
        return data.query ? Object.values(data.query.pages) : [];
    } catch (error) {
        console.error('Lỗi khi tìm kiếm:', error);
        throw error;
    }
};

export const fetchArticleDetails = async (title) => {
    const params = {
        action: 'query',
        titles: title,
        prop: 'extracts|pageimages|info',
        pithumbsize: 400,
        inprop: 'url',
        redirects: true,
        format: 'json',
        origin: '*'
    };

    try {
        const response = await fetch(buildUrl(params));
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const pages = data.query.pages;
        // Trả về đối tượng bài viết đầu tiên (vì titles chỉ truyền 1 title)
        return Object.values(pages)[0];
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết bài viết:', error);
        throw error;
    }
};