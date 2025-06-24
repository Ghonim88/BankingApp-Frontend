<template>
  <div class="container mt-5">
    <div class="mb-3">
      <router-link to="/atm" class="btn btn-link p-0">← Go back</router-link>
    </div>

    <div class="card p-5 mx-auto shadow-lg text-center" style="max-width: 600px;" v-if="step === 'select'">
      <h3 class="mb-3">Select the amount of cash you would like to withdraw</h3>
      <p class="text-muted">Press Cancel to go back to the main menu</p>

      <div class="row mt-4">
        <div class="col-6 d-flex flex-column gap-2">
          <button class="btn btn-warning fw-semibold" @click="prepareConfirm(10)">10</button>
          <button class="btn btn-warning fw-semibold" @click="prepareConfirm(50)">50</button>
          <button class="btn btn-warning fw-semibold" @click="prepareConfirm(100)">100</button>
        </div>
        <div class="col-6 d-flex flex-column gap-2">
          <button class="btn btn-warning fw-semibold" @click="prepareConfirm(200)">200</button>
          <button class="btn btn-outline-secondary" @click="step = 'custom'">Custom</button>
          <button class="btn btn-outline-danger" @click="goBack">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Custom input screen -->
    <div class="card p-5 mx-auto shadow-lg text-center" style="max-width: 600px;" v-else-if="step === 'custom'">
      <h4 class="mb-4">Enter custom amount</h4>
      <input v-model="customAmount" type="number" class="form-control text-center mb-4" placeholder="Enter amount (€)" />

      <div class="d-flex flex-column align-items-end gap-2">
        <button class="btn btn-warning fw-semibold px-4" @click="prepareConfirm(Number(customAmount))" :disabled="!customAmount || customAmount <= 0">Withdraw</button>
        <button class="btn btn-outline-secondary px-4" @click="step = 'select'">Back</button>
      </div>
    </div>

    <!-- Confirm screen -->
    <div class="card p-5 mx-auto shadow-lg text-center" style="max-width: 600px;" v-else-if="step === 'confirm'">
      <h4 class="mb-4">Confirm withdrawal</h4>
        <p class="mb-4">You are about to withdraw:</p>
      <h2 class="fw-bold mb-4">€{{ confirmAmount }}</h2>

        <div class="d-flex flex-column align-items-end gap-2 mt-3">
            <button class="btn btn-warning fw-semibold px-4" @click="attemptWithdraw">Confirm</button>
            <button class="btn btn-outline-secondary px-4" @click="step = 'select'">Cancel</button>
        </div>
    </div>


    <!-- Success screen -->
    <div class="card p-5 mx-auto shadow-lg text-center" style="max-width: 600px;" v-else-if="step === 'success'">
      <h4 class="mb-4 text-success">Transaction successful</h4>
      <p class="mb-4 text-black"><strong>Balance:</strong> €{{ newBalance.toFixed(2) }}</p>

      <div class="d-flex flex-column align-items-end gap-2 mt-4">
        <button class="btn btn-warning fw-semibold px-4" @click="step = 'select'">New transaction</button>
        <button class="btn btn-outline-secondary px-4" @click="goBack">Exit</button>
      </div>
    </div>

    <!-- Error screen -->
    <div class="card p-5 mx-auto shadow-lg text-center" style="max-width: 600px;" v-else-if="step === 'error'">
      <h4 class="mb-4 text-danger">Insufficient balance</h4>

      <div class="d-flex flex-column align-items-end gap-2 mt-4">
        <button class="btn btn-warning fw-semibold px-4" @click="step = 'select'">Select different amount</button>
        <button class="btn btn-outline-secondary px-4" @click="step = 'select'">New transaction</button>
        <button class="btn btn-outline-secondary px-4" @click="goBack">Exit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/axios-auth';
import { jwtDecode } from 'jwt-decode';

const router = useRouter();
const step = ref('select');
const customAmount = ref('');
const confirmAmount = ref(0);
const newBalance = ref(0);
const userId = jwtDecode(localStorage.getItem("token")).userId;
const checkingAccount = ref(null);

onMounted(async () => {
  const res = await axios.get(`/accounts/customer/${userId}`);
  checkingAccount.value = res.data.find(acc => acc.accountType === 'CHECKING');
});

const prepareConfirm = (amount) => {
  confirmAmount.value = amount;
  step.value = 'confirm';
};

const attemptWithdraw = async () => {
  try {
    const res = await axios.post('/api/transactions/atm/withdraw', {
      accountId: checkingAccount.value.accountId,
      amount: confirmAmount.value
    });
    newBalance.value = res.data.newBalance;
    step.value = 'success';
  } catch {
    step.value = 'error';
  }
};

const goBack = () => {
  router.push('/atm');
};
</script>


