// stores/transactionsStore.js
import { defineStore } from 'pinia';
import axios from '@/axios-auth';

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    allTransactions: [],
    customerTransactions: [],
    accountTransactions: [],
  }),

  actions: {
    async fetchAllTransactions() {
      const response = await axios.get('/transactions');
      this.allTransactions = response.data;
    },

    async fetchCustomerTransactions(customerId) {
      const response = await axios.get(`/customers/${customerId}/transactions`);
      this.customerTransactions = response.data;
    },

    async fetchAccountTransactions(accountId) {
      const response = await axios.get(`/accounts/${accountId}/transactions`);
      this.accountTransactions = response.data;
    },
  }
});
