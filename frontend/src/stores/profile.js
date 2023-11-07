import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
    state: () => ({
        profile: {}
    }),
    getters: {
        getProfile: (state) => state.profile
    },
    actions: {
        setProfile(profile) {
            this.profile = profile
        }
    }
})