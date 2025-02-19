<template>
  <v-container>
    <v-card class="pa-5 mx-auto" max-width="900">
      <v-card-title class="text-h5">Employee List</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="employees"
          :loading="loading"
          class="elevation-1"
        >
        </v-data-table>
      </v-card-text>
    </v-card>


  </v-container>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import EmployeeApi from "@/Api/Modules/Employee";

export default {
  data() {
    return {
      valid: false,
 
      employees: [],
      headers: [
        { title: "ID", key: "id" }, // Include the ID
        { title: "Name", key: "name" },
        { title: "Email", key: "email" },
        { title: "Phone", key: "phone" },
        { title: "Designation", key: "designation" },
        { title: "Salary", key: "salary" },
      ],
      loading: true, // Add a loading state
      showloader: false,
    };
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      this.loading = true; // Set loading to true while fetching
      try {
        const response = await EmployeeApi.getEmployees(); // Call your API function
        this.employees = response.data;
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Handle error (e.g., display a message)
      } finally {
        this.loading = false; // Set loading to false after fetch, even if error
      }
    },




  },
};
</script>