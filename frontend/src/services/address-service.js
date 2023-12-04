import axios from "axios";
import { API_URL } from "@/common/constants";
import authHeader from "@/services/auth-header";

class AddressService {
  getAddresses() {
    return axios.get(API_URL + "addresses", {
      headers: authHeader(),
    });
  }
  postAddress(address) {
    return axios.post(API_URL + "addresses", address, {
      headers: authHeader(),
    });
  }
  deleteAddress(id) {
    return axios.delete(API_URL + "addresses/" + id, {
      headers: authHeader(),
    });
  }
  putAddress(address) {
    return axios.put(API_URL + "addresses/" + address.id, address, {
      headers: authHeader(),
    });
  }
}

export default new AddressService();
