<template>
  <div class="container mt-5">
    <div v-if="successMessage" class="alert alert-success text-center">
      {{ successMessage }}
    </div>

    <a
      class="icon-link link-offset-2 link-offset-3-hover link-underline-dark link-underline-opacity-0 link-underline-opacity-75-hover text-black mb-5"
      href="/customers"
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

    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="details-tab"
          data-bs-toggle="tab"
          data-bs-target="#details-tab-pane"
          type="button"
          role="tab"
          aria-controls="details-tab-pane"
          aria-selected="true"
        >
          Details
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="accounts-tab"
          data-bs-toggle="tab"
          data-bs-target="#accounts-tab-pane"
          type="button"
          role="tab"
          aria-controls="accounts-tab-pane"
          aria-selected="false"
          :disabled="isPending"
        >
          Accounts
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="transactions-tab"
          data-bs-toggle="tab"
          data-bs-target="#transactions-tab-pane"
          type="button"
          role="tab"
          aria-controls="transactions-tab-pane"
          aria-selected="false"
          :disabled="isPending"
        >
          Transactions
        </button>
      </li>
    </ul>

    <div class="tab-content mt-5" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="details-tab-pane"
        role="tabpanel"
        aria-labelledby="details-tab"
        tabindex="0"
      >
        <div class="row justify-content-around">
          <div class="col-md-4">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">First Name:</th>
                  <td>{{ firstName }}</td>
                </tr>
                <tr>
                  <th scope="row">Last Name:</th>
                  <td>{{ lastName }}</td>
                </tr>
                <tr>
                  <th scope="row">Email:</th>
                  <td>{{ email }}</td>
                </tr>
                <tr>
                  <th scope="row">BSN:</th>
                  <td>{{ bsn }}</td>
                </tr>
                <tr>
                  <th scope="row">Phone:</th>
                  <td>{{ phoneNumber }}</td>
                </tr>
                <tr>
                  <th scope="row">Status:</th>
                  <td>{{ accountStatus || "" }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-md-4 d-flex align-items-center">
            <div class="row justify-content-end w-100">
              <template v-if="accountStatus === 'Pending'">
                <p class="text-black text-end col-9">
                  This customer was not approved yet.
                </p>
                <button
                  class="btn btn-primary w-50 mt-3 col-2"
                  @click="navigateToCreateAccounts"
                >
                  Take action
                </button>
              </template>

              <template v-else-if="accountStatus === 'Verified'">
                <button class="btn btn-danger w-50 mt-3 col-2">
                  Close Account
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div
          class="tab-pane fade"
          id="accounts-tab-pane"
          role="tabpanel"
          aria-labelledby="accounts-tab"
          tabindex="0"
      >
        <div v-if="accountStore.customerAccounts.length">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>IBAN</th>
              <th>Type</th>
              <th>Balance (€)</th>
              <th>Daily Limit</th>
              <th>Absolute Limit</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="acc in accountStore.customerAccounts" :key="acc.accountId">
              <td>{{ acc.iban }}</td>
              <td>{{ acc.accountType }}</td>
              <td>{{ acc.balance }}</td>
              <td>{{ acc.dailyTransferLimit }}</td>
              <td>{{ acc.absoluteTransferLimit }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-muted">No accounts found.</div>
      </div>

      <div class="tab-pane fade" id="transactions-tab-pane" role="tabpanel" aria-labelledby="transactions-tab" tabindex="0">
        <div v-if="transactionStore.customerTransactions.length">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>Date</th>
              <th>From IBAN</th>
              <th>To IBAN</th>
              <th>Amount (€)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="tx in transactionStore.customerTransactions" :key="tx.transactionId">
              <td>{{ new Date(tx.createdAt).toLocaleString() }}</td>
              <td>{{ tx.senderIban }}</td>
              <td>{{ tx.receiverIban }}</td>
              <td>{{ tx.transactionAmount }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-muted">No transactions found.</div>
      </div>

      <div
        class="tab-pane fade"
        id="disabled-tab-pane"
        role="tabpanel"
        aria-labelledby="disabled-tab"
        tabindex="0"
      >
        ...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/customers";
import { useTransactionsStore } from "@/stores/transactions";
import { useAccountStore } from "@/stores/accounts";


const route = useRoute();
const successMessage = ref("");
const router = useRouter();
const customerId = route.params.id;


const transactionStore = useTransactionsStore();
const store = useCustomerStore();
const accountStore = useAccountStore();

onMounted(() => {
  store.fetchCustomerDetails(customerId);
  transactionStore.fetchCustomerTransactions(customerId);
  accountStore.fetchAccountsByCustomer(customerId);

});
onMounted(() => {
  successMessage.value = route.query.successMessage || "";
  if (successMessage.value) {
    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  }
});

const accountStatus = computed(
  () => store.selectedCustomer?.accountStatus || ""
);
const isPending = computed(() => accountStatus.value === "Pending");

const firstName = computed(() => store.selectedCustomer?.firstName || "");
const lastName = computed(() => store.selectedCustomer?.lastName || "");
const email = computed(() => store.selectedCustomer?.email || "");
const bsn = computed(() => store.selectedCustomer?.bsn || "");
const phoneNumber = computed(() => store.selectedCustomer?.phoneNumber || "");

function navigateToCreateAccounts() {
  router.push(`/customers/${route.params.id}/approve`);
}
</script>

<style scoped>
.nav-tabs .nav-link {
  background-color: #edcb83;
  color: black;
}

.nav-tabs .nav-link.active {
  background-color: #d7b060;
}

.nav-link:disabled {
  background-color: #e3d1aa;
  color: #6f6f6f;
  cursor: not-allowed;
}

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
