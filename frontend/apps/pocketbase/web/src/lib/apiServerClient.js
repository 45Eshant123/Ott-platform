const apiBaseUrl = import.meta.env.VITE_API_SERVER_URL || 'http://127.0.0.1:4000';

const normalizePath = (path) => {
    if (!path) return '';
    return path.startsWith('/') ? path : `/${path}`;
};

const apiServerClient = {
    fetch: (path, options = {}) => {
        const endpoint = `${apiBaseUrl}${normalizePath(path)}`;
        return fetch(endpoint, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            }
        });
    }
};

export default apiServerClient;
