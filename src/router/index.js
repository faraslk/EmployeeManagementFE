
import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHistory } from "vue-router";
import Form from './modules/form'

//   const routes =[
//   ...Form,

//  ];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router