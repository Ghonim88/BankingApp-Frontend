<template>
  <div class="container mt-5">
    <h1 class="mt-1">Transactions</h1>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <router-link to="/transactions/new" class="btn btn-warning">New Transaction</router-link>
    </div>

    <table class="table table-hover table-striped mt-5">
      <thead>
        <tr>
          <th>Transaction id</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Amount</th>
          <th>Timestamp</th>
          <!-- <th>Initiator</th>
          <th>Type</th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactions"
          :key="transaction.transactionId"
        >
          <td>{{ transaction.transactionId }}</td>
          <td>{{ transaction.senderIban }}</td>
          <td>{{ transaction.receiverIban }}</td>
          <td>{{ transaction.transactionAmount }}</td>
          <td>{{ transaction.createdAt }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>

import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useTransactionsStore } from "@/stores/transactions";
import { storeToRefs } from "pinia";

const store = useTransactionsStore();
const { allTransactions: transactions } = storeToRefs(store);

onMounted(() => {
  store.fetchAllTransactions();
})

</script>

<style scoped>
.all-transactions-container {
  margin-top: 50px;
}

.select-wide {
  min-width: 160px;
}

</style>
