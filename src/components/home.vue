<template>

<title>Employee Management System</title>
  <Header />
  <Employeeview />
</template>
<script>
import Header from "@/components/header.vue";
import Employeeview from "@/components/Employeeview.vue";
export default {
  components: {
    Header,
    Employeeview,
  },
};
</script>