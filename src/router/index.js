import { createRouter, createWebHistory } from "vue-router";
import homeRoutes from "./modules/home";
import formRoutes from "./modules/form";
import viewemployee from "./modules/viewemployee";
import EditEmployee from "./modules/EditEmployee";

const routes = [
  ...homeRoutes,
  ...formRoutes,
  ...viewemployee,
  ...EditEmployee

  ];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;