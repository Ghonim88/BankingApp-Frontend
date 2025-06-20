<template>
  <div class="container mt-5">
    <a
      class="icon-link link-offset-2 link-offset-3-hover link-underline-dark link-underline-opacity-0 link-underline-opacity-75-hover text-black mb-5"
      href="/BankingApp-Frontend/bank/accounts"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 12H6M12 5l-7 7 7 7" />
      </svg>
      Go back
    </a>

    <div v-if="successMessage" class="alert alert-success text-center">
      {{ successMessage }}
    </div>

    <h1 class="mt-1">Transactions</h1>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-primary mt-3 px-4 py-2" @click="newTransfer">
        Transfer
      </button>
    </div>

    <div class="mt-4">
      <label for="accountSelect" class="form-label">Select Account:</label>
      <select v-model="accountId" id="accountSelect" class="form-select">
        <option
          v-for="acc in customerAccounts"
          :key="acc.accountId"
          :value="acc.accountId"
        >
          {{ acc.accountType }} - {{ acc.iban }}
        </option>
      </select>
    </div>

    <div v-if="selectedAccount" class="card p-3 mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>{{ selectedAccount.accountType }}</strong>
          <br />
          <small>{{ selectedAccount.iban }}</small>
        </div>
        <div>
          <span class="fw-bold">€ {{ selectedAccount.balance?.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <h4 class="mb-3">Filter Transactions</h4>
    <div class="row mb-4">
      <div class="col-md-2">
        <label class="form-label">Start Date</label>
        <input type="date" v-model="startDate" class="form-control" />
      </div>
      <div class="col-md-2">
        <label class="form-label">End Date</label>
        <input type="date" v-model="endDate" class="form-control" />
      </div>
      <div class="col-md-2">
        <label class="form-label">Min Amount (€)</label>
        <input type="number" v-model="minAmount" class="form-control" />
      </div>
      <div class="col-md-2">
        <label class="form-label">Max Amount (€)</label>
        <input type="number" v-model="maxAmount" class="form-control" />
      </div>
      <div class="col-md-3">
        <label class="form-label">IBAN</label>
        <input type="text" v-model="iban" class="form-control" />
      </div>
      <div class="col-md-1 d-flex align-items-end">
        <button class="btn btn-primary w-100" @click="applyFilters">
          Filter
        </button>
      </div>
    </div>

    <div v-if="transactions.length" class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount (€)</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in transactions" :key="tx.transactionId">
            <td>{{ new Date(tx.createdAt).toLocaleString() }}</td>
            <td>{{ tx.senderIban }}</td>
            <td>{{ tx.receiverIban }}</td>
            <td>{{ tx.transactionAmount.toFixed(2) }}</td>
            <td>{{ tx.transactionType }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-muted">No transactions to display.</div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useAccountStore } from "@/stores/accounts";
import { useTransactionsStore } from "@/stores/transactions";
import { ref, onMounted, computed, watch } from "vue";
import { jwtDecode } from "jwt-decode";
import { storeToRefs } from "pinia";

const accountStore = useAccountStore();
const transactionsStore = useTransactionsStore();
const route = useRoute();
const router = useRouter();
const successMessage = ref("");

const token = localStorage.getItem("token");
const decodedToken = jwtDecode(token);
const userId = decodedToken.userId;

const { customerAccounts } = storeToRefs(accountStore);
const accountId = ref(route.params.id);
const selectedAccount = computed(() =>
  customerAccounts.value.find((acc) => acc.accountId == accountId.value)
);

const transactions = computed(() => transactionsStore.accountTransactions);

const startDate = ref("");
const endDate = ref("");
const minAmount = ref("");
const maxAmount = ref("");
const iban = ref("");

const applyFilters = () => {
  const filters = {
    startDate: startDate.value || null,
    endDate: endDate.value || null,
    minAmount: minAmount.value ? parseFloat(minAmount.value) : null,
    maxAmount: maxAmount.value ? parseFloat(maxAmount.value) : null,
    iban: iban.value || null,
  };
  transactionsStore.filterAccountTransactions(accountId.value, filters);
};

const loadAccountData = () => {
  accountStore.fetchAccountById(accountId.value);
  transactionsStore.fetchAccountTransactions(accountId.value);
  startDate.value = "";
  endDate.value = "";
  minAmount.value = "";
  maxAmount.value = "";
  iban.value = "";
};

onMounted(() => {
  accountStore.fetchAccountsByCustomer(userId).then(loadAccountData);
});

watch(accountId, () => {
  router.push({ path: `/bank/transactions/${accountId.value}` });
  loadAccountData();
});

onMounted(() => {
  successMessage.value = route.query.successMessage || "";
  if (successMessage.value) {
    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  }
});

function newTransfer() {
  router.push(`/bank/transactions/new`);
}
</script>

<style scoped>
.btn-primary {
  background-color: #edcb83;
  border: none;
  color: black;
}
.btn-primary:hover,
.btn-primary:focus {
  background-color: #d7b060;
  color: black;
}
</style>
