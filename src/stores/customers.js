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
        return res.data; // <-- ✅ return the fetched customer data

      } catch (err) {
        this.error = err;
        console.log("Failed to fetch the selected customer: ", err);
      }
    },

    async fetchCustomerAccounts(customerId) {
      try {
        const res = await axios.get(`/customers/${customerId}/accounts`);
        this.accounts = res.data;
      } catch (err) {
        this.error = err;
        console.log("Failed to load the customer bank accounts: ", err);
      }
      //this one is not working yet since there is no backend endpoint
    },

    async fetchCustomerTransactions(customerId) {
      try {
        const res = await axios.get(`/customers/${customerId}/transactions`);
        this.transactions = res.data;
      } catch (err) {
        this.error = err;
        console.log("Failed to load the customer transactions: ", err);
      }
      //this one not working -> no api endpoint
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
  },
});
