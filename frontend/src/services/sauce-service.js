import axios from "axios";
import { API_URL } from "@/common/constants";

class SauceService {
  getSauces() {
    return axios.get(API_URL + "sauces");
  }
}

export default new SauceService();
