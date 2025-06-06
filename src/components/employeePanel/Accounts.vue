<template>
  <div class="container mt-5">
    <h1 class="mt-1">Accounts</h1>

    <!-- Search Filters -->
    <div class="container text-left p-0">
      <div class="row gx-3 gy-2">
        <div class="col-auto">
          <div class="py-3">Search by:</div>
        </div>
        <div class="col-auto">
          <input
              type="text"
              class="form-control p-3 select-wide"
              placeholder="Owner Email"
              v-model="searchOwner"
          />
        </div>
        <div class="col-auto">
          <input
              type="text"
              class="form-control p-3 select-wide"
              placeholder="IBAN"
              v-model="searchIban"
          />
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-secondary mt-2" @click="resetFilters">Reset search</button>
        </div>
      </div>
    </div>

    <!-- Account Table -->
    <table class="table table-hover table-striped mt-4">
      <thead>
      <tr>
        <th>Account ID</th>
        <th>IBAN</th>
        <th>Balance</th>
        <th>Owner Email</th>
        <th>Daily Transfer Limit</th>
        <th>Absolute Transfer Limit</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="account in filteredAccounts" :key="account.accountId">
        <td>{{ account.accountId }}</td>
        <td>{{ account.iban }}</td>
        <td>€{{ formatAmount(account.balance) }}</td>
        <td>{{ account.ownerEmail }}</td>
        <td>€{{ formatAmount(account.dailyTransferLimit) }}</td>
        <td>€{{ formatAmount(account.absoluteTransferLimit) }}</td>
        <td>
          <router-link
              :to="`/accounts/${account.accountId}`"
              class="btn btn-warning"
          >
            Details
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAccountStore } from '@/stores/accounts';

const searchOwner = ref('');
const searchIban = ref('');

const accountStore = useAccountStore();

onMounted(() => {
  accountStore.fetchAllAccounts();
});

const filteredAccounts = computed(() => {
  return accountStore.allAccounts.filter(account => {
    const matchesOwner = account.ownerEmail?.toLowerCase().includes(searchOwner.value.toLowerCase());
    const matchesIban = account.iban?.toLowerCase().includes(searchIban.value.toLowerCase());
    return matchesOwner && matchesIban;
  });
});

function resetFilters() {
  searchOwner.value = '';
  searchIban.value = '';
}

function formatAmount(value) {
  return parseFloat(value).toFixed(2);
}
</script>
