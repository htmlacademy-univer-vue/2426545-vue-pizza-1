import axios from "axios";
import { API_URL } from "@/common/constants";

class MiscService {
  getMisc() {
    return axios.get(API_URL + "misc");
  }
}

export default new MiscService();
