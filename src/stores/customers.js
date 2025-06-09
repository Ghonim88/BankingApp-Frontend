import { defineStore } from "pinia";
import axios from "@/axios-auth";

export const useCustomerStore = defineStore("CustomerStore", {
  state: () => ({
    all: [],
    selectedCustomer: null,
    accounts: [],
    transactions: [],
  }),

  actions: {
    async fetchAllCustomers() {
      try {
        const res = await axios.get(`/customers`);
        this.all = res.data;
      } catch (err) {
        this.error = err;
        console.log("Failed to fetch all customers: ", err);
      }
    },

    async fetchCustomerDetails(customerId) {
      try {
        const res = await axios.get(`/customers/${customerId}`);
        this.selectedCustomer = res.data;
        return res.data;
      } catch (err) {
        this.error = err;
        console.log("Failed to fetch the selected customer: ", err);
      }
    },

    async updateCustomerAccountStatus(customerId, newStatus) {
      try {
        const res = await axios.put(`/customers/${customerId}`, {
          accountStatus: newStatus,
        });
        this.selectedCustomer = res.data;
        return res.data;
      } catch (error) {
        console.error("Failed to update customer account status:", error);
        throw error;
      }
    },

    async searchCustomersByName(name) {
      try {
        const res = await axios.get(`/customers/search?name=${encodeURIComponent(name)}`);
        console.log("this is the found customer data in the store: ", res.data);
        return res.data; // returns a list of { name, iban }
        
      } catch (err) {
        console.error("Failed to search customers by name:", err);
        throw err;
      }
    },
  },
});
