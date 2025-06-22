<template>
  <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-white">
    <div class="card text-center shadow p-5" style="border-radius: 1rem; background-color: #fdfdfd; max-width: 450px;">
      <h1 class="mb-4 fw-bold text-black">Admin Dashboard</h1>
      <div class="d-grid gap-3">
        <button
          @click="goToCustomers"
          class="btn btn-lg fw-semibold text-black"
          style="background-color: #edcb83;"
        >
          Customers
        </button>
        <button
          @click="goToTransactions"
          class="btn btn-lg fw-semibold text-black"
          style="background-color: #edcb83;"
        >
          Transactions
        </button>
        <button
          @click="goToAccounts"
          class="btn btn-lg fw-semibold text-black"
          style="background-color: #edcb83;"
        >
          Accounts
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToCustomers = () => {
  router.push('/customers'); // Adjust route as needed
};

const goToTransactions = () => {
  router.push('/transactions'); // Adjust route as needed
};
const goToAccounts = () => {
  router.push('/accounts'); // Adjust route as needed
};
</script>


<style scoped>
button:hover {
  background-color: #000 !important;
  color: #fff !important;
  transition: all 0.3s ease-in-out;
}
</style>
