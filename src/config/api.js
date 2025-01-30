// Remove the trailing slash if present in the base URL
export const API_BASE_URL = 'https://backend-vizboard-1.onrender.com';

export const API_ENDPOINTS = {
    // Make sure we don't have double slashes in the URLs
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    PROJECTS: `${API_BASE_URL}/api/projects`,
    TASKS: `${API_BASE_URL}/api/tasks`
}; 