export default [
    {
      path: "/",
      component: import("@/components/home.vue"),
  
      // login Route
  
      children: [
        {
          path: "/form",
          component: import("@/views/form.vue"),
        },
      ],
    },
  ];