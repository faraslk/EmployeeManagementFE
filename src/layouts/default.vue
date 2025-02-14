<template>

    <div><Header /></div>

    <v-main>
      <router-view />

      <div class="pt-3"></div>
    </v-main>

<Dashboard />

</template>
<script>
import Header from "@/components/header.vue";
import Dashboard from "@/components/Dashboard.vue";
export default {
  components: {
    Header,
    Dashboard,
  },
};
</script>

