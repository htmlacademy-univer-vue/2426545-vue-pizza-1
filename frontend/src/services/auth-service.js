import axios from "axios";

import { API_URL } from "@/common/constants";
import authHeader from "@/services/auth-header";
import { removeToken } from "@/services/token-manager";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        return response.data;
      });
  }

  logout() {
    return axios
      .delete(API_URL + "logout", { headers: authHeader() })
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.status === 204) {
          removeToken();
          return response.data;
        }
      });
  }
  whoAmI() {
    return axios.get(API_URL + "whoAmI", {
      headers: authHeader(),
    });
  }
}

export default new AuthService();
