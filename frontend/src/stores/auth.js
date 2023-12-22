import { defineStore } from "pinia";
import authService from "@/services/auth-service";
import { removeToken, setToken } from "@/services/token-manager";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
  },
  actions: {
    async login(email, password) {
      try {
        const data = await authService.login({ email, password });
        setToken(data.token);
        await this.getMe();
        return "ok";
      } catch (e) {
        return e.message;
      }
    },
    async getMe() {
      await authService.whoAmI().then((r) => {
        if (r.status === 200) {
          this.user = r.data;
        } else {
          this.user = null;
        }
      });
    },
    async logout(sendRequest = true) {
      await authService.logout();
      this.user = null;
      if (sendRequest) removeToken();
    },
  },
});
