<template>
  <v-container>
    <v-card class="pa-5 mx-auto" max-width="1200">
      <v-card-title class="text-h5">
        Employee List
        <v-spacer></v-spacer>
        <v-btn icon="mdi-plus" @click="openAddDialog"></v-btn>

        <v-btn @click="toggleShowMore" v-if="filteredEmployees.length > 5">
          {{ showAll ? "Show Less" : "Show More" }}
        </v-btn>
      </v-card-title>

      <v-text-field
        v-model="search"
        label="Search"
        append-icon="mdi-magnify"
        single-line
        hide-details
      ></v-text-field>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="displayedEmployees"
          :loading="loading"
          class="elevation-1 table-head"
        >
          <template v-slot:[`item.edit`]="{ item }">
            <v-icon small class="mr-2" @click="editEmployee(item)"
              >mdi-pencil</v-icon
            >
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-icon small @click="deleteEmployee(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="addDialog" max-width="500px"> 
      <v-card>
        <v-card-title>Add Employee</v-card-title>
        <v-card-text>
          <v-form ref="addForm" v-model="addFormValid">
            <v-text-field
              label="Name"
              v-model="newEmployee.name"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="newEmployee.email"
              type="email"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-text-field
              label="Phone"
              v-model="newEmployee.phone"
              type="tel"
              :rules="[rules.required, rules.phone]"
            ></v-text-field>
            <v-text-field
              label="Designation"
              v-model="newEmployee.designation"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Salary"
              v-model="newEmployee.salary"
              type="number"
              :rules="[rules.required, rules.salary]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addEmployee" :disabled="!addFormValid">
            Add
          </v-btn>
          <v-btn color="secondary" @click="closeAddDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" max-width="500px"> <v-card>
        <v-card-title>Edit Employee</v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-model="editFormValid">
            <v-text-field
              label="Name"
              v-model="editedEmployee.name"
              :rules="[rules.required]"  
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="editedEmployee.email"
              type="email"
              :rules="[rules.required, rules.email]" 
            ></v-text-field>
            <v-text-field
              label="Phone"
              v-model="editedEmployee.phone"
              type="tel"
              :rules="[rules.required, rules.phone]" 
            ></v-text-field>
            <v-text-field
              label="Designation"
              v-model="editedEmployee.designation"
              :rules="[rules.required]" 
            ></v-text-field>
            <v-text-field
              label="Salary"
              v-model="editedEmployee.salary"
              type="number"
              :rules="[rules.required, rules.salary]" 
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveEmployee" :disabled="!editFormValid">Save</v-btn>
          <v-btn color="secondary" @click="closeEditDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
 </v-dialog>
  </v-container>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import EmployeeApi from "@/Api/Modules/Employee"; // Adjust path if needed

export default {
  data() {
    return {
      valid: false,
      employees: [],
      headers: [
        { title: "ID", key: "id" },
        { title: "Name", key: "name" },
        { title: "Email", key: "email" },
        { title: "Phone", key: "phone" },
        { title: "Designation", key: "designation" },
        { title: "Salary", key: "salary" },
        { title: "Edit", key: "edit", sortable: false },
        { title: "Delete", key: "delete", sortable: false },
      ],
      loading: true,
      showloader: false,
      addDialog: false,
      newEmployee: {
        /* ... */
      }, // No changes
      addFormValid: false,
      rules: {
        /* ... */
      }, // No changes
      editDialog: false,
      editedEmployee: {
        /* ... */
      }, // No changes
      editFormValid: false,
      // rules: { /* ... */ },    // No changes (already defined above)
      showAll: false, // Controls whether to show all records or just the last 5
      search: "", // For the search functionality
    };
  },

  mounted() {
    this.fetchEmployees();
  },

  computed: {
    filteredEmployees() {
      const searchTerm = this.search.toLowerCase();
      return this.employees.filter((employee) => {
        const searchableFields = [
          employee.name,
          employee.email,
          employee.phone,
          employee.designation,
        ];
        return searchableFields.some((field) => {
          if (field) {
            return field.toLowerCase().includes(searchTerm);
          }
          return false;
        });
      });
    },

    displayedEmployees() {
      if (this.showAll) {
        return this.filteredEmployees;
      } else {
        const startIndex = Math.max(0, this.filteredEmployees.length - 5);
        return this.filteredEmployees.slice(startIndex);
      }
    },
  },

  methods: {
    async fetchEmployees() {
      this.loading = true;
      try {
        const response = await EmployeeApi.getEmployees();
        this.employees = response.data;
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        this.loading = false;
      }
    },
    openAddDialog() {
      this.addDialog = true;
      // Reset the form and validation:
      this.newEmployee = {
        name: "",
        email: "",
        phone: "",
        designation: "",
        salary: "",
      };
      if (this.$refs.addForm) {
        this.$refs.addForm.reset();
      }
      this.addFormValid = false;
    },

    closeAddDialog() {
      this.addDialog = false;
    },
    async addEmployee() {
      if (this.addFormValid) {
        try {
          const response = await EmployeeApi.storeEmployees(this.newEmployee);
          console.log("Employee added:", response.data);
          this.fetchEmployees(); // Refresh the list
          this.closeAddDialog();
        } catch (error) {
          console.error("Error adding employee:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            console.error("Validation Errors:", error.response.data.errors);
            for (const field in error.response.data.errors) {
              error.response.data.errors[field].forEach((errorMessage) => {
                alert(`${field}: ${errorMessage}`); // Replace with snackbar
              });
            }
          } else if (error.response) {
            console.error("Server Error:", error.response.data);
            alert("A server error occurred. Please try again later."); // Replace with snackbar
          } else {
            console.error("Request Error:", error.message);
            alert(
              "A request error occurred. Please check your network connection."
            ); // Replace with snackbar
          }
        }
      }
    },

    editEmployee(item) {
      this.editedEmployee = { ...item }; // Copy the item!
      this.editDialog = true;
    },

    closeEditDialog() {
      this.editDialog = false;
      this.editedEmployee = {
        // Reset the editedEmployee object
        id: null,
        name: "",
        email: "",
        phone: "",
        designation: "",
        salary: "",
      };
      if (this.$refs.editForm) {
        // Check if the ref exists
        this.$refs.editForm.reset(); // Reset form validation
      }
      this.editFormValid = false; // Reset validity
    },

    async saveEmployee() {
      if (this.editFormValid) {
        try {
          const payload = { ...this.editedEmployee }; // Create a payload object
          delete payload.id; // Remove the ID from the payload (usually not needed for updates)

          const response = await EmployeeApi.updateEmployees(
            this.editedEmployee.id,
            payload
          );
          console.log("Employee updated:", response.data);
          this.fetchEmployees(); // Refresh the employee list
          this.closeEditDialog(); // Close the dialog
        } catch (error) {
          console.error("Error updating employee:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            console.error("Validation Errors:", error.response.data.errors);
            // Display validation errors (e.g., using a snackbar):
            for (const field in error.response.data.errors) {
              error.response.data.errors[field].forEach((errorMessage) => {
                alert(`${field}: ${errorMessage}`); // Replace with snackbar
              });
            }
          } else if (error.response) {
            console.error("Server Error:", error.response.data);
            alert("A server error occurred. Please try again later."); // Replace with snackbar
          } else {
            console.error("Request Error:", error.message);
            alert(
              "A request error occurred. Please check your network connection."
            ); // Replace with snackbar
          }
        }
      }
    },
    deleteEmployee(item) {
      if (confirm("Are you sure you want to delete this employee?")) {
        try {
          EmployeeApi.deleteEmployee(item.id).then(() => {
            this.fetchEmployees();
          });
          console.log("Employee deleted:", item);
        } catch (error) {
          console.error("Error deleting employee:", error);
        }
      }
    },

    showMore() {
      this.showAll = true;
    },
    toggleShowMore() {
      this.showAll = !this.showAll; // Toggle between true and false
    },
  },
};
</script>
<style scoped>

.table-head{

background-color: rgb(221, 234, 238);

}

</style>