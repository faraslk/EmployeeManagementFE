import { api } from "../index";

export default {
  async getEmployees() {
    return await api.get("/employees");
  },

  async storeEmployees(payload) {
    return await api.post("/employees", payload);
  },

  async updateEmployees(id, payload) {
    return await api.put(`/employees/${id}`, payload);
  },

  async deleteEmployees(id) {
    return await api.delete(`/employees/${id}`);
  },
};
