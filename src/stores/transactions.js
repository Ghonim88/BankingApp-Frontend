import { defineStore } from 'pinia';
import axios from '@/axios-auth';

export const useTransactionsStore = defineStore('TransactionStore', {
  state: () => ({
    allTransactions: [],
    customerTransactions: [],
    accountTransactions: [],
  }),

  actions: {
    async fetchAllTransactions() {
      try {
        const res = await axios.get(`/api/transactions`);
        this.allTransactions = res.data;
      } catch (err) {
        this.error = err;
        console.log("Failed to fetch all transactions: ", err);
      }
    },

    async fetchCustomerTransactions(customerId) {
      const response = await axios.get(`/api/transactions/customer/${customerId}`);
      this.customerTransactions = response.data;
    },

    async fetchAccountTransactions(accountId) {
      const response = await axios.get(`/accounts/${accountId}/transactions`);
      this.accountTransactions = response.data;
    },
  }
});
