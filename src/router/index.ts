import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/login/callback",
    name: "LoginCallback",
    component: () => import("@/pages/Login/Callback/index.vue"),
  },
  {
    path: "/",
    name: "Login",
    component: () => import("@/pages/Login/index.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/pages/Home/index.vue"),
  },
  {
    path: "/history",
    name: "History",
    component: () => import("@/pages/History/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  // Restaura do localStorage
  const token = localStorage.getItem("token");
  if (token && !auth.token) {
    auth.setToken(token);
    const user = localStorage.getItem("user");
    if (user) {
      auth.setUser(JSON.parse(user));
    }
  }

  const publicPages = ["/", "/login", "/login/callback"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !auth.token) {
    return next("/");
  }

  // Redireciona para /home se já está logado e acessando login
  if (auth.token && ["/", "/login"].includes(to.path)) {
    return next("/home");
  }

  next();
});

export default router;
