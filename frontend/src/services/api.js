
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        'Authorization': user ? `Bearer ${user.token}` : ''
    };
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || 'Request failed');
    }
    return response.json();
};

export const getTasks = async (status = '') => {
  let url = API_URL;
  if (status) {
      url += `?status=${status}`;
  }
  const response = await fetch(url, {
      headers: getAuthHeaders()
  });
  return handleResponse(response);
};

export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(task),
  });
  return handleResponse(response);
};

export const updateTask = async (id, updates) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

