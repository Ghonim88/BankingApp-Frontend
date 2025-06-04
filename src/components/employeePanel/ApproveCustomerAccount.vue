<template>
  <div class="container mt-5">
    <h2>Create Accounts for {{ customerName }}</h2>

    <div
      class="account-container mb-4 p-3 bg-white overflow-auto"
      style="max-height: 400px"
    >
      <div v-for="(account, index) in accounts" :key="index" class="card mb-3">
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label">Account Type</label>
            <select v-model="account.type" class="form-select">
              <option value="CHECKING" :disabled="hasChecking">Checking</option>
              <option value="SAVINGS" :disabled="hasSavings">Savings</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Daily Transfer Limit</label>
            <input
              type="number"
              v-model.number="account.dailyLimit"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Absolute Transfer Limit</label>
            <input
              type="number"
              v-model.number="account.absoluteLimit"
              class="form-control"
            />
          </div>
        </div>
      </div>

      <div v-if="accounts.length < 2" class="mt-3 d-flex justify-content-start">
        <button class="btn btn-success px-4" @click="addAccount">
          Add Account
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button
        class="btn btn-outline-secondary"
        data-bs-toggle="modal"
        data-bs-target="#cancelModal"
      >
        Cancel Operation
      </button>
      <button
        class="btn btn-primary"
        @click="approveAccounts"
        :disabled="accounts.length !== 2"
      >
        Approve Accounts
      </button>
    </div>

    <!-- Cancel Modal -->
    <div
      class="modal fade"
      id="cancelModal"
      tabindex="-1"
      aria-labelledby="cancelModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cancel Operation</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            If you proceed, all the changes will be lost.
            <br />
            Do you wish to cancel the operation?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="confirmCancel"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAccountStore } from "@/stores/accounts";
import { useCustomerStore } from "@/stores/customers";
import axios from "@/axios-auth";

const route = useRoute();
const router = useRouter();
const accountStore = useAccountStore();
const customerStore = useCustomerStore();

const customerId = route.params.id;
const customerName = ref("");
const accounts = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`/customers/${customerId}`);
    customerName.value = `${response.data.firstName} ${response.data.lastName}`;
  } catch (error) {
    console.error("Failed to load customer data:", error);
  }
});

function addAccount() {
  const defaultType = !hasChecking.value ? "CHECKING" : "SAVINGS";
  accounts.value.push({ type: defaultType, dailyLimit: 0, absoluteLimit: 0 });
}

function confirmCancel() {
  router.push(`/customers/${customerId}`);
}

async function approveAccounts() {
  try {
    await accountStore.approveAccounts(customerId, accounts.value);
    await customerStore.updateCustomerAccountStatus(customerId, "Verified");
    router.push({
      path: `/customers/${customerId}`,
      query: { successMessage: 'The customer account has been verified successfully.' }
    });
  } catch (error) {
    console.error("Error approving accounts:", error);
  }
}

const hasChecking = computed(() =>
  accounts.value.some((acc) => acc.type === "CHECKING")
);
const hasSavings = computed(() =>
  accounts.value.some((acc) => acc.type === "SAVINGS")
);
</script>

<style scoped>
.scroll-container {
  max-height: 400px;
  overflow-y: auto;
}
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
