<template>
    <v-container>
      <v-card class="pa-5 mx-auto" max-width="500">
        <v-card-title class="text-h5">Employee Details</v-card-title>
        <v-card-text>
          <v-form ref="employeeForm" v-model="valid">
            <v-text-field
              label="Name"
              v-model="form.name"
              :rules="[rules.required]"
            ></v-text-field>
  
            <v-text-field
              label="Email"
              v-model="form.email"
              type="email"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
  
            <v-text-field
              label="Phone"
              v-model="form.phone"
              type="tel"
              :rules="[rules.required, rules.phone]"
            ></v-text-field>
  
            <v-text-field
              label="Designation"
              v-model="form.designation"
              :rules="[rules.required]"
            ></v-text-field>
  
            <v-text-field
              label="Salary"
              v-model="form.salary"
              type="number"
              :rules="[rules.required, rules.salary]"
            ></v-text-field>
  
            <v-btn class="mt-4" color="primary" :disabled="!valid" @click="submitForm">
              Submit
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref } from "vue";
  import EmployeeApi from "@/Api/Modules/Employee"; // Import your API module
  
  export default {
    data() {
      return {
        valid: false,
        form: {
          name: "",
          email: "",
          phone: "",
          designation: "",
          salary: "",
        },
        rules: {
          required: (value) => !!value || "Required.",
          email: (value) => /.+@.+\..+/.test(value) || "Invalid email.",
          phone: (value) => /^\d{10}$/.test(value) || "Enter a valid 10-digit phone number.",
          salary: (value) => (value > 0 && Number.isInteger(+value)) || "Enter a valid salary.",
        },
        showloader: false, // Add a loader property (if needed)
      };
    },
    methods: {
      async submitForm() {
        if (this.valid) {  // Check form validity
          this.showloader = true;
          try {
            const response = await EmployeeApi.storeEmployees(this.form);
            console.log("Employee created:", response.data);
            this.form = { name: "", email: "", phone: "", designation: "", salary: "" }; // Reset form
            this.$emit("closeModal", true); // Emit a close event (if used in a modal)
            // or a success message:
            // this.$snackbar.open({ message: 'Employee created!', color: 'success' });
          } catch (error) {
            console.error("Error creating employee:", error);
            if (error.response && error.response.data && error.response.data.errors) {
              console.error("Validation Errors:", error.response.data.errors);
              // Display validation errors (e.g., using a snackbar):
              for (const field in error.response.data.errors) {
                error.response.data.errors[field].forEach(errorMessage => {
                  alert(`${field}: ${errorMessage}`); // Replace with snackbar
                });
              }
            } else if (error.response) {
              console.error("Server Error:", error.response.data);
              alert("A server error occurred. Please try again later."); // Replace with snackbar
            } else {
              console.error("Request Error:", error.message);
              alert("A request error occurred. Please check your network connection."); // Replace with snackbar
            }
          } finally {
            this.showloader = false;
          }
        }
      },
    },
  };
  </script>