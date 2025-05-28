// stores/customerStore.js
import { defineStore } from 'pinia';
import axios from '@/axios-auth';

export const useCustomerStore = defineStore('CustomerStore', {
  state: () => ({
    all: [],
    selectedCustomer: null,
    accounts: [],
    transactions: [],
  }),

  actions: {
    async fetchAllCustomers() {
        const res = await axios.get(`/customers`);
        this.all = res.data;
    },
    async fetchCustomerDetails(customerId) {
      const res = await axios.get(`/customers/${customerId}`);
      this.selectedCustomer = res.data;
    },
    async fetchCustomerAccounts(customerId) {
      const res = await axios.get(`/customers/${customerId}/accounts`);
      this.accounts = res.data;
    },
    async fetchCustomerTransactions(customerId) {
      const res = await axios.get(`/customers/${customerId}/transactions`);
      this.transactions = res.data;
    },
  },
});
