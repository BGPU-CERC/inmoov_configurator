import { router } from "@/router";
import { computed } from "vue";
import { useStorage } from "./useStorage";

const { storage } = useStorage();

export function useAuth() {
  const token = computed({
    get() {
      return storage.value.authorization;
    },
    set(value) {
      storage.value.authorization = value;
    },
  });

  function login(form) {
    token.value = form.token;
    router.push("/");
  }

  function logout() {
    token.value = null;
    router.replace("/login");
  }

  return {
    token,
    login,
    logout,
  };
}
