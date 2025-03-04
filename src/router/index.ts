import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TaskListView from "../views/TaskListView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/tasks", component: TaskListView },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
