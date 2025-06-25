<template>
  <div class="container mt-5">
    <div class="mb-3">
      <router-link to="/bank/accounts" class="btn btn-link p-0">← Go back to bank</router-link>
    </div>

    <div class="card p-5 mx-auto shadow-lg" style="max-width: 700px;">
      <div class="row align-items-center">
        <!-- Left: Info -->
        <div class="col-md-6">
          <p class="mb-1 text-muted">Welcome</p>
          <h4 class="fw-bold">{{ customerName }}</h4>

          <p class="mt-4 mb-1 text-muted">Balance (Checking Account)</p>
          <h3 class="fw-bold text-dark">€ {{ totalBalance.toFixed(2) }}</h3>
        </div>

        <!-- Right: Buttons -->
        <div class="col-md-6 d-flex flex-column gap-3">
          <button class="btn fw-semibold text-black" style="background-color: #EDCB83; padding: 16px; font-size: 1.2rem;" @click="goTo('withdraw')" >Withdraw </button>
          <button class="btn fw-semibold text-black" style="background-color: #EDCB83; padding: 16px; font-size: 1.2rem;" @click="goTo('deposit')" >Deposit </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from "@/stores/accounts";
import { useCustomerStore } from "@/stores/customers";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

const accountStore = useAccountStore();
const customerStore = useCustomerStore();
const router = useRouter();

const { customerAccounts: accounts } = storeToRefs(accountStore);
const { selectedCustomer } = storeToRefs(customerStore);

const token = localStorage.getItem("token");
const decodedToken = jwtDecode(token);
const userId = decodedToken.userId;

onMounted(() => {
  accountStore.fetchAccountsByCustomer(userId);
  customerStore.fetchCustomerDetails(userId); // ✅ fetch the customer name
});

const totalBalance = computed(() => {
  const checking = accounts.value.find(acc => acc.accountType === 'CHECKING');
  return checking?.balance || 0;
});


const customerName = computed(() => {
  const firstName = selectedCustomer.value?.firstName || "Customer";
  const lastName = selectedCustomer.value?.lastName || "";
  return `${firstName} ${lastName}`.trim();
});

const goTo = (action) => {
  router.push(`/atm/${action}`);
};
</script>
