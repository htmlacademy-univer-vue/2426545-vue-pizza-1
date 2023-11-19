import axios from "axios";
import { API_URL } from "@/common/constants";
import authHeader from "@/services/auth-header";
class OrderService {
  getOrders() {
    return axios.get(API_URL + "orders", {
      headers: authHeader(),
    });
  }
  postOrder(order) {
    return axios.post(API_URL + "orders", order, {
      headers: authHeader(),
    });
  }
  deleteOrder(id) {
    return axios.delete(API_URL + "orders/" + id, {
      headers: authHeader(),
    });
  }
}

export default new OrderService();
