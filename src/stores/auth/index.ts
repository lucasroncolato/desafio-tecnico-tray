import { defineStore } from "pinia";

interface User {
  name: string;
  email: string;
  picture: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken;
      localStorage.setItem("token", newToken);
    },
    setUser(user: User) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
