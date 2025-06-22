import { defineStore } from "pinia";
import axios from "@/axios-auth";

export const useTransactionsStore = defineStore("TransactionStore", {
  state: () => ({
    allTransactions: [],
    customerTransactions: [],
    accountTransactions: [],
    paginationInfo: {
      page: 0,
      totalPages: 1,
      totalElements: 0,
    },
  }),

  actions: {
    async fetchAllTransactions(page = 0, size = 10) {
      try {
        const res = await axios.get(`/api/transactions?page=${page}&size=${size}`);
        this.allTransactions = res.data.content;
        this.paginationInfo = {
          page: res.data.number,
          totalPages: res.data.totalPages,
          totalElements: res.data.totalElements,
        };
      } catch (err) {
        this.error = err;
        console.log("Failed to fetch all transactions: ", err);
      }
    },

    async fetchCustomerTransactions(customerId) {
      const response = await axios.get(
        `/api/transactions/customer/${customerId}`
      );
      this.customerTransactions = response.data;
    },

    async fetchAccountTransactions(accountId) {
      try {
        const response = await axios.get(
          `api/transactions/accounts/${accountId}`
        );
        this.accountTransactions = response.data;
      } catch (err) {
        this.error = err;
        console.log(
          "Failed to fetch all transactions for the specific account: ",
          err
        );
      }
    },

    async filterAccountTransactions(accountId, filterParams) {
      try {
        const response = await axios.post(
          `/api/transactions/accounts/${accountId}/filter`,
          filterParams
        );
        this.accountTransactions = response.data;
      } catch (err) {
        this.error = err;
        console.error("Failed to filter transactions for account:", err);
      }
    },
  },
});
