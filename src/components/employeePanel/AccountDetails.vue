<template>
  <div class="container mt-5">
    <router-link to="/accounts" class="text-decoration-none mb-3 d-block">
      ← Go back
    </router-link>

    <h2 class="mb-4">Account id: {{ accountStore.selectedAccount?.accountId }}</h2>

    <div class="p-4 bg-light rounded" v-if="accountStore.selectedAccount">
      <div class="row mb-3">
        <div class="col-4 fw-bold">Owner id</div>
        <div class="col-8">{{ accountStore.selectedAccount.customerId }}</div>
      </div>

      <div class="row mb-3">
        <div class="col-4 fw-bold">IBAN</div>
        <div class="col-8">{{ accountStore.selectedAccount.iban }}</div>
      </div>

      <div class="row mb-3">
        <div class="col-4 fw-bold">Balance</div>
        <div class="col-8">€{{ accountStore.selectedAccount.balance.toFixed(2) }}</div>
      </div>

      <div class="row mb-3 align-items-center">
        <div class="col-4 fw-bold">Daily transfer limit</div>
        <div class="col-8 d-flex align-items-center">
          <span v-if="!editing.daily">
            €{{ accountStore.selectedAccount.dailyTransferLimit.toFixed(2) }}
            <button class="btn btn-sm btn-warning ms-3" @click="editing.daily = true">Edit</button>
          </span>
          <span v-else>
            <input
                type="number"
                v-model="updated.daily"
                class="form-control form-control-sm d-inline-block"
                style="width: 100px;"
            />
            <button class="btn btn-sm btn-success ms-2" @click="save('daily')">Save</button>
            <button class="btn btn-sm btn-secondary ms-2" @click="cancel('daily')">Cancel</button>
          </span>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-4 fw-bold">Absolute transaction limit</div>
        <div class="col-8 d-flex align-items-center">
          <span v-if="!editing.absolute">
            €{{ accountStore.selectedAccount.absoluteTransferLimit.toFixed(2) }}
            <button class="btn btn-sm btn-warning ms-3" @click="editing.absolute = true">Edit</button>
          </span>
          <span v-else>
            <input
                type="number"
                v-model="updated.absolute"
                class="form-control form-control-sm d-inline-block"
                style="width: 100px;"
            />
            <button class="btn btn-sm btn-success ms-2" @click="save('absolute')">Save</button>
            <button class="btn btn-sm btn-secondary ms-2" @click="cancel('absolute')">Cancel</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAccountStore } from '@/stores/accounts';

const route = useRoute();
const router = useRouter();
const accountStore = useAccountStore();

const editing = ref({
  daily: false,
  absolute: false
});

const updated = ref({
  daily: null,
  absolute: null
});

onMounted(async () => {
  try {
    await accountStore.fetchAccountById(route.params.id);
    updated.value.daily = accountStore.selectedAccount.dailyTransferLimit;
    updated.value.absolute = accountStore.selectedAccount.absoluteTransferLimit;
  } catch {
    router.push("/accounts");
  }
});

const save = async (field) => {
  const payload = {};
  if (field === "daily") {
    payload.dailyTransferLimit = updated.value.daily;
  } else if (field === "absolute") {
    payload.absoluteTransferLimit = updated.value.absolute;
  }

  try {
    await accountStore.updateAccount(accountStore.selectedAccount.accountId, payload);
    editing.value[field] = false;
  } catch (err) {
    console.error("Update failed", err);
  }
};

const cancel = (field) => {
  if (!accountStore.selectedAccount) return;
  if (field === "daily") {
    updated.value.daily = accountStore.selectedAccount.dailyTransferLimit;
  } else if (field === "absolute") {
    updated.value.absolute = accountStore.selectedAccount.absoluteTransferLimit;
  }
  editing.value[field] = false;
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
