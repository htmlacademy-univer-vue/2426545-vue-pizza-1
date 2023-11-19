import axios from "axios";
import { API_URL } from "@/common/constants";

class DoughService {
  getDoughs() {
    return axios.get(API_URL + "dough");
  }
}

export default new DoughService();
