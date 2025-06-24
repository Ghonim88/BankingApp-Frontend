<template>
  <div class="container mt-5">
    <h1 class="mt-1">Transactions</h1>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <router-link to="/transactions/new" class="btn btn-warning"
        >New Transaction</router-link
      >
    </div>

    <table class="table table-hover table-striped mt-5">
      <thead>
        <tr>
          <th>Transaction id</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Amount</th>
          <th>Type</th>
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
          <td>{{ transaction.transactionType }}</td>
          <td>{{ transaction.createdAt }}</td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between align-items-center mt-4">
      <button
        class="btn btn-secondary"
        :disabled="paginationInfo.page <= 0"
        @click="currentPage--"
      >
        Previous
      </button>

      <div>
        Page {{ paginationInfo.page + 1 }} of {{ paginationInfo.totalPages }}
      </div>

      <button
        class="btn btn-secondary"
        :disabled="paginationInfo.page >= paginationInfo.totalPages - 1"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useTransactionsStore } from "@/stores/transactions";
import { storeToRefs } from "pinia";

const store = useTransactionsStore();
const { allTransactions: transactions, paginationInfo } = storeToRefs(store);
const currentPage = ref(0);
const pageSize = 10;

onMounted(() => {
  store.fetchAllTransactions(currentPage.value, pageSize);
});

watch(currentPage, (newPage) => {
  store.fetchAllTransactions(newPage, pageSize);
});
</script>

<style scoped>
.all-transactions-container {
  margin-top: 50px;
}

.select-wide {
  min-width: 160px;
}
</style>
