<template>
  <div class="container mt-5">
    <h1 class="mt-1">Overview</h1>
    <div class="mt-4">
      <div class="list-group">
        <div
          v-for="account in accounts"
          :key="account.accountId"
          class="list-group-item d-flex justify-content-between align-items-center mb-3"
        >
          <div>
            <strong>{{ account.accountType }}</strong><br />
            <small>{{ account.iban }}</small>
          </div>
          <div class="d-flex align-items-center">
            <span class="me-3">€ {{ account.balance?.toFixed(2) }}</span>
            <i 
              class="bi bi-chevron-right" 
              role="button"
              @click="goToTransfer(account.accountId)"
              title="Transfer Funds"
              style="font-size: 1.2rem;"
            ></i>
          </div>
        </div>

        <!-- Total Balance Container -->
        <div class="list-group-item d-flex justify-content-between align-items-center mb-3 list-group-item-dark">
          <div>
            <strong>Total Balance</strong><br />
          </div>
          <div class="d-flex align-items-center">
            <span class="me-3">€ {{ totalBalance.toFixed(2) }}</span>
          </div>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from "@/stores/accounts";
import { storeToRefs } from "pinia";
import { computed, ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

const accountStore = useAccountStore();
const router = useRouter();

const { customerAccounts: accounts } = storeToRefs(accountStore);


const token = localStorage.getItem("token");
const decodedToken = jwtDecode(token);
const userId = decodedToken.userId;

onMounted(() => {
  accountStore.fetchAccountsByCustomer(userId);
})

const totalBalance = computed(() =>
  accounts.value.reduce((sum, acc) => sum + (acc.balance || 0), 0)
);

const goToTransfer = (accountId) => {
  router.push({ path: `/bank/transactions/${accountId}` });
};

</script>
