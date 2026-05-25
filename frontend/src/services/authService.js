import api from './api';

export const authService = {
  register: (data) => api.post('/register', data),
  login:    (data) => api.post('/login', data),
  firebaseLogin: (data) => api.post('/firebase-login', data),
  logout:   ()     => api.post('/logout'),
  me:       ()     => api.get('/me'),
};
