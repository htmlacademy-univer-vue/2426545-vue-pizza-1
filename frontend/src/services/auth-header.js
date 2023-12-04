import { getToken } from "@/services/token-manager";

export default function authHeader() {
  let token = getToken();

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
