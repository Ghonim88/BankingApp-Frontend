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
        const res = await axios.get(
          `/api/transactions?page=${page}&size=${size}`
        );
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

    async filterAccountTransactions(
      accountId,
      filterParams,
      page = 0,
      size = 10
    ) {
      try {
        const params = new URLSearchParams();

        if (filterParams.startDate)
          params.append("startDate", filterParams.startDate);
        if (filterParams.endDate)
          params.append("endDate", filterParams.endDate);
        if (filterParams.minAmount)
          params.append("minAmount", filterParams.minAmount);
        if (filterParams.maxAmount)
          params.append("maxAmount", filterParams.maxAmount);
        if (filterParams.iban) params.append("iban", filterParams.iban);

        params.append("page", page);
        params.append("size", size);

        const response = await axios.get(
          `/api/transactions/accounts/${accountId}/filter`,
          { params }
        );

        this.accountTransactions = response.data.content; 
        this.paginationInfo = {
          page: response.data.number,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
        };
      } catch (err) {
        this.error = err;
        console.error("Failed to filter transactions for account:", err);
      }
    },
  },
});
