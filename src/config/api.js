export const API_BASE_URL = 'https://backend-vizboard-1.onrender.com';

const createUrl = (base, path) => {
    return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
};

export const API_ENDPOINTS = {
    SIGNUP: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    PROJECTS: '/api/projects',
    TASKS: '/api/tasks'
};


console.log('Full signup URL:', `${API_BASE_URL}${API_ENDPOINTS.SIGNUP}`);


console.log('API Endpoints:', API_ENDPOINTS); 