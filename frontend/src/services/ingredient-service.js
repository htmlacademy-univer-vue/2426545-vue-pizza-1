import axios from "axios";
import { API_URL } from "@/common/constants";

class IngredientService {
  getIngredients() {
    return axios.get(API_URL + "ingredients");
  }
}

export default new IngredientService();
