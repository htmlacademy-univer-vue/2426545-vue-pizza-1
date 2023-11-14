import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: {
      id: 0,
      name: "",
      email: "",
      avatar: "",
      phone: "",
    },
  }),
  getters: {
    getProfile: (state) => state.profile,
  },
  actions: {
    login(email, password) {
      // TODO add logic
      console.log(email, password);
      this.profile = {};
    },
    logout() {
      // TODO add logic
      this.profile = {};
    },
  },
});
