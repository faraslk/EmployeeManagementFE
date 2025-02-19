<template>
  <div class="main-div">
    <v-row>
    <v-col cols="12" lg="3">
        <v-card @click="$router.push('/form')" class="card-style">
        <div class="image-container">
          <img src="@/assets/add.png" alt="Icon"  />
        </div>
       <v-card-text class="card-text">Add Employee</v-card-text>
    
        </v-card>
</v-col>
<v-col cols="12" lg="3">
        <v-card @click="$router.push('/viewemployee')" target="_blank" class="card-style">
        <div class="image-container">
          <img src="D:\Faras\Laravel + Vue\EmployeeManagementFE\src\assets\view-icon.jpg" alt="Icon"  />
        </div>
       <v-card-text class="card-text">View Employees</v-card-text>
    
        </v-card>
</v-col>
<v-col cols="12" lg="3">
        <v-card :href="'https://www.w3schools.com'" target="_blank" class="card-style">
        <div class="image-container">
          <img src="D:\Faras\Laravel + Vue\EmployeeManagementFE\src\assets\edit-emp.png" alt="Icon"  />
        </div>
       <v-card-text class="card-text">Edit Employee</v-card-text>
    
        </v-card>
</v-col>
<v-col cols="12" lg="3">
        <v-card :href="'https://www.w3schools.com'" target="_blank" class="card-style">
        <div class="image-container">
          <img src="D:\Faras\Laravel + Vue\EmployeeManagementFE\src\assets\delete.webp" alt="Icon"  />
        </div>
       <v-card-text class="card-text">Remove Employee</v-card-text>
    
        </v-card>
</v-col>
</v-row>
<v-row>
  <v-col cols="12" lg="6">
        <v-card :href="'https://www.w3schools.com'" target="_blank" class="card-style">
        <div class="image-container">
          <img src="D:\Faras\Laravel + Vue\EmployeeManagementFE\src\assets\search.png" alt="Icon"  />
        </div>
       <v-card-text class="card-text">Search Employee</v-card-text>
    
        </v-card>
</v-col>
</v-row>
  </div>
</template>
<script>
import form from '@/views/form.vue';



</script>
<style>
.main-div {
  margin: 100px 100px 100px 100px;
}
.card-style{
 background-color: rgb(240, 232, 211) !important;
}
.image-container {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

img {
  height: 100px;
  width: 100px;
}
.card-text{

  font-size: 48px !important;
  text-align: center;

}
</style>
