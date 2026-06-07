import api from './api';

export const roomService = {
  list:   ()           => api.get('/rooms'),
  get:    (id)         => api.get(`/rooms/${id}`),
  create: (data)       => api.post('/rooms', data),
  update: (id, data)   => api.put(`/rooms/${id}`, data),
  delete: (id)         => api.delete(`/rooms/${id}`),
  join:   (id)         => api.post(`/rooms/${id}/join`),
  leave:  (id)         => api.post(`/rooms/${id}/leave`),
};

