import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TaskListView from "../views/TaskListView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AboutView from "../views/AboutView.vue";

// Simulating an auth check (Replace this with Vuex/Pinia or an API call)
const isAuthenticated = () => {
  return localStorage.getItem("access_token") !== null; // Check if userToken exists
};

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/tasks",
    component: TaskListView,
    meta: { requiresAuth: true }, // Mark route as protected
  },
  {
    path: "/login",
    component: Login,
    meta: { guestOnly: true }, // Prevent access if logged in
  },
  {
    path: "/register",
    component: Register,
    meta: { guestOnly: true }, // Prevent access if logged in
  },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login"); // Redirect unauthorized users to login
  } else if (to.meta.guestOnly && isAuthenticated()) {
    next("/tasks"); // Redirect logged-in users away from login/register
  } else {
    next(); // Allow access
  }
});

export default router;
