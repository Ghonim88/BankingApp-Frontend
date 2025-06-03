import { defineStore } from "pinia";
import axios from "@/axios-auth";

export const useAccountStore = defineStore("AccountStore", {
  state: () => ({
    customerAccounts: [],
    allAccounts: [],
    accountsToCreate: [],
    error: null,
  }),

  actions: {
    // async fetchAccountsByCustomer(customerId) {
    //   try {
    //     const res = await axios.get(`/customers/${customerId}/accounts`);
    //     this.customerAccounts = res.data;
    //   } catch (err) {
    //     this.error = err;
    //     console.error('Failed to fetch customer accounts:', err);
    //   }
    // },
    //TODO: add try catch blocks in customer store

    async fetchAllAccounts() {
      try {
        const res = await axios.get(`/accounts`);
        this.allAccounts = res.data;
      } catch (err) {
        this.error = err;
        console.error("Failed to fetch all accounts:", err);
      }
    },

    async approveAccounts(customerId, accounts) {
      try {
        const sanitizedAccounts = accounts.map((acc) => ({
          customerId,
          accountType: acc.type,
          dailyTransferLimit: acc.dailyLimit  || 0,
          absoluteTransferLimit: acc.absoluteLimit  || 0,
        }));

        await axios.post("/accounts", sanitizedAccounts); 
      } catch (err) {
        this.error = err;
        console.error("Account approval failed:", err);
        throw err;
      }
    },
  },
});
