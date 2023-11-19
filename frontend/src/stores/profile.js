import { defineStore } from "pinia";
import addressService from "@/services/address-service";
import authService from "@/services/auth-service";
import {getToken} from "@/services/token-manager";
export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: {},
    addresses: [],
  }),
  getters: {
    getProfile: (state) => state.profile,
    getAddresses: (state) => state.addresses,
    getAddressAdd: (state) => state.addressAdd,
  },
  actions: {
    logout() {
      authService.logout();
      this.profile = {};
    },
    addAddress(address) {
      addressService.postAddress(address).then((r) => {
        if (r.status !== 200) {
          alert("Error adding address");
          return;
        }
        this.addresses.push(r.data)
      })

    },

    updateAddress(address) {

      addressService.putAddress(address).then((r) => {
        if (r.status === 200 || r.status === 204) {
          this.addresses = this.addresses.map((a) => {
            if (a.id === address.id) {
              return address;
            }
            return a;
          })
          return;
        }
        alert("Error updating address");
      })
    },

    deleteAddress(addressId) {
      console.log(addressId)
      addressService.deleteAddress(addressId).then((r) => {
        console.log(r)
        if (r.status === 200 || r.status === 204) {
          this.addresses = this.addresses.filter((address) => {
            return address.id !== addressId;
          })
          return;
        }
        alert("Error deleting address");
      })
    },

    fetchUserAddress() {
      if (getToken() === undefined) {
        return;
      }
      addressService.getAddresses().then((r) => {
        if (r.status !== 200) {
          return;
        }
        this.addresses = r.data;
      });
    },
    fetchUser() {
      if (getToken() === undefined) {
        return;
      }
      authService.whoAmI().then((r) => {
        if (r.status !== 200) {
          return;
        }
        this.profile = r.data;
      });
    },
  },
});
