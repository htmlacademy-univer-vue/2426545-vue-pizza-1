import axios from "axios";
import { API_URL } from "@/common/constants";

class SizeService {
  getSizes() {
    return axios.get(API_URL + "sizes");
  }
}

export default new SizeService();
