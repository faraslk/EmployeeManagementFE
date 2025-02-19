export default [
  {
    path: "/",
    component: () => import("@/components/home.vue"),
    children: [
      {
        path: "",
        component: () => import("@/components/home.vue"),
      },
      
    ],
  },
];