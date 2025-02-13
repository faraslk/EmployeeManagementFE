<template>
    <v-container>
      <v-card class="pa-5 mx-auto" max-width="500">
        <v-card-title class="text-h5">Employee Details</v-card-title>
        <v-card-text>
          <v-form ref="employeeForm" v-model="valid">
            <v-select
              label="Salutation"
              v-model="form.salutation"
              :items="['Mr.', 'Ms.', 'Mrs.', 'Dr.']"
              required
            ></v-select>
  
            <v-text-field
              label="First Name"
              v-model="form.firstName"
              :rules="[rules.required]"
            ></v-text-field>
  
            <v-text-field
              label="Last Name"
              v-model="form.lastName"
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
  
  <script setup>
  import { ref } from "vue";
  
  const valid = ref(false);
  const form = ref({
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
  });
  
  const rules = {
    required: (value) => !!value || "Required.",
    email: (value) => /.+@.+\..+/.test(value) || "Invalid email.",
    phone: (value) => /^\d{10}$/.test(value) || "Enter a valid 10-digit phone number.",
    salary: (value) => (value > 0 && Number.isInteger(+value)) || "Enter a valid salary.",
  };
  
  const submitForm = () => {
    alert("Form submitted successfully!");
    console.log(form.value);
  };
  </script>
  