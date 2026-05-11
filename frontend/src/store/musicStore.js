import { create } from 'zustand';
import { musicService } from '../services/musicService';

export const useMusicStore = create((set) => ({
  queue: [],
  currentSong: null,
  syncInfo: null,   // { currentTime, serverTimestamp }

  fetchQueue: async (roomId) => {
    const { data } = await musicService.getQueue(roomId);
    set({ queue: data.queue, currentSong: data.current });
  },

  addSong: async (roomId, url) => {
    await musicService.addSong(roomId, url);
  },

  skip: async (roomId) => {
    await musicService.skip(roomId);
  },

  updateSync: (syncInfo) => set({ syncInfo }),
}));

