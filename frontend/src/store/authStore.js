import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true });
    const { data } = await authService.login(credentials);
    localStorage.setItem('token', data.token);
    set({ user: data.user, token: data.token, isLoading: false });
  },

  logout: async () => {
    await authService.logout();
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  fetchMe: async () => {
    const { data } = await authService.me();
    set({ user: data });
  },
}));

