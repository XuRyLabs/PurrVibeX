import { create } from 'zustand';
import { roomService } from '../services/roomService';

export const useRoomStore = create((set) => ({
  rooms: [],
  currentRoom: null,

  fetchRooms: async () => {
    const { data } = await roomService.list();
    set({ rooms: data });
  },

  joinRoom: async (id) => {
    await roomService.join(id);
    const { data } = await roomService.get(id);
    set({ currentRoom: data });
  },

  leaveRoom: async (id) => {
    await roomService.leave(id);
    set({ currentRoom: null });
  },
}));

