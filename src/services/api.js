
const API_BASE = "https://backend-2-production-0f74.up.railway.app/api";

export const fetchApi = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  
  return response.json();
};

// User related API calls
export const userApi = {
  register: (data) => fetchApi('/users/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => fetchApi('/users/login', { method: 'POST', body: JSON.stringify(data) }),
  profile: () => fetchApi('/users/profile'),
};

// Blog related API calls
export const blogApi = {
  getAll: () => fetchApi('/blogs'),
  create: (data) => fetchApi('/blogs', { method: 'POST', body: JSON.stringify(data) }),
  getById: (id) => fetchApi(`/blogs/${id}`),
  update: (id, data) => fetchApi(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetchApi(`/blogs/${id}`, { method: 'DELETE' }),
};

// Category related API calls
export const categoryApi = {
  getAll: () => fetchApi('/categories'),
  create: (data) => fetchApi('/categories', { method: 'POST', body: JSON.stringify(data) }),
};