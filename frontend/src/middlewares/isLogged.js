import { useAuthStore } from "@/stores";

export default function isLogged() {
  const authStore = useAuthStore();
  if (!authStore.user) {
    return { path: "/" };
  }
  return true;
}
