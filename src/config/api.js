// Define the base URL without any trailing slashes
export const API_BASE_URL = 'https://backend-vizboard-1.onrender.com';

// Helper function to join URLs properly
const createUrl = (base, path) => {
    return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
};

export const API_ENDPOINTS = {
    SIGNUP: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    PROJECTS: '/api/projects',
    TASKS: '/api/tasks'
};

// For debugging
console.log('Full signup URL:', `${API_BASE_URL}${API_ENDPOINTS.SIGNUP}`);

// For debugging - remove in production
console.log('API Endpoints:', API_ENDPOINTS); 