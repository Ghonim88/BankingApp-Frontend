import { defineStore } from "pinia";
import axios from "@/axios-auth";

export const useCustomerStore = defineStore("CustomerStore", {
  state: () => ({
    all: [],
    selectedCustomer: null,
    accounts: [],
    transactions: [],
    paginationInfo: {
      page: 0,
      totalPages: 1,
      totalElements: 0,
    },
  }),

  actions: {
    async fetchCustomersByStatus(status = "", page = 0, size = 10) {
      try {
        const endpoint = status
          ? `/customers/status/${status.toLowerCase()}?page=${page}&size=${size}`
          : `/customers?page=${page}&size=${size}`;

        const res = await axios.get(endpoint);
        this.all = res.data.content;
        this.paginationInfo = {
          page: res.data.number,
          totalPages: res.data.totalPages,
          totalElements: res.data.totalElements,
        };
      } catch (err) {
        this.error = err;
        console.log("Failed to fetch customers by status: ", err);
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
        const res = await axios.get(
          `/customers/search?name=${encodeURIComponent(name)}`
        );
        console.log("this is the found customer data in the store: ", res.data);
        return res.data; // returns a list of { name, iban }
      } catch (err) {
        console.error("Failed to search customers by name:", err);
        throw err;
      }
    },
  },
});
