import { defineStore } from "pinia";
import axios from "@/axios-auth";

export const useAccountStore = defineStore("AccountStore", {
  state: () => ({
    customerAccounts: [],
    allAccounts: [],
    accountsToCreate: [],
    selectedAccount: null,
    error: null,
  }),

  actions: {
    
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

    async fetchAccountById(id) {
      try {
        const res = await axios.get(`/accounts/${id}`);
        this.selectedAccount = res.data;
      } catch (err) {
        this.error = err;
        console.error("Failed to fetch account by ID:", err);
        throw err;
      }
    },

    async updateAccount(id, updatedFields) {
      try {
        await axios.put(`/accounts/${id}`, updatedFields);
        Object.assign(this.selectedAccount, updatedFields); // sync local state
      } catch (err) {
        this.error = err;
        console.error("Failed to update account:", err);
        throw err;
      }
    },

    async fetchAccountsByCustomer(customerId) {
      try {
        const res = await axios.get(`/accounts/customer/${customerId}`);
        this.customerAccounts = res.data;
      } catch (err) {
        this.error = err;
        console.error("Failed to fetch customer accounts:", err);
      }
    }

  },
});
