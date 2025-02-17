import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    login(userData) {
      this.user = userData;
      this.token = userData.token;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
