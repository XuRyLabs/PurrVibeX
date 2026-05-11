import api from './api';

export const musicService = {
  getQueue: (roomId)          => api.get(`/rooms/${roomId}/music/queue`),
  addSong:  (roomId, url)     => api.post(`/rooms/${roomId}/music/add`, { url }),
  skip:     (roomId)          => api.post(`/rooms/${roomId}/music/skip`),
  sync:     (roomId)          => api.get(`/rooms/${roomId}/music/sync`),
};

