import axios from "axios";

import { API_URL } from "@/common/constants";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    return axios.delete(API_URL + "logout").then((response) => {
      if (response.data) {
        localStorage.removeItem("user");
      }
    });
  }
    whoAmI() {
    return axios.get(API_URL + "whoAmI");
  }
}

export default new AuthService();
