import api from './api';

export const userService = {
  /** Get authenticated user's full backend profile */
  getMe: () => api.get('/me'),

  /** Get public profile by username slug */
  getByUsername: (username) => api.get(`/users/by-username/${encodeURIComponent(username)}`),

  /** Get any user's public profile */
  getUser: (id) => api.get(`/users/${id}`),

  /** Update authenticated user's profile */
  updateProfile: (data) => api.put('/users/me', data),
};

