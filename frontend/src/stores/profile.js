import { defineStore } from "pinia";
import profile from "../mocks/profile.json";
import addresses from "../mocks/addresses.json";
export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: {
      id: 0,
      name: "",
      email: "",
      avatar: "",
      phone: "",
    },
    addresses: [],
  }),
  getters: {
    getProfile: (state) => state.profile,
    getAddresses: (state) => state.addresses,
    getAddressAdd: (state) => state.addressAdd,
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

    addAddress(address) {
      // TODO add logic
      let addressConverted = {
        id: this.addresses.length + 1,
        name: address.name,
        street: address.street,
        building: address.building,
        flat: address.flat,
        comment: address.comment,
      }
      this.addresses.push(addressConverted);
    },

    updateAddress(address) {
      // TODO add logic
      console.log(address);
    },

    deleteAddress(addressId) {
      // TODO add logic
      console.log(addressId);
    },

    fetchUserAddress(userId) {
      // TODO add logic
      console.log(userId);
      if (this.addresses.length === 0) {
        this.addresses = addresses;
      }
      return this.addresses;
    },
    fetchUser() {
      // TODO add logic to get token
      if (this.profile.name === "") {
        this.profile = profile;
      }

      return this.profile;
    }
  },
});
