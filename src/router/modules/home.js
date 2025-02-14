export default [
    {
      path: "/",
      component: import("@/components/home.vue"),
  
      children: [
        {
          path: "/",
          // component : import("..pages/index.vue")
          component: import("@/components/home.vue"),
        },
        {
          path: "/form",
          // component : import("..pages/index.vue")
          component: import("@/views/form.vue"),
        },
      ],
    },
  ];
  