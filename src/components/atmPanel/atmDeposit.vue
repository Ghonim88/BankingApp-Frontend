<template>
  <div class="container mt-5">
    <div class="mb-3">
      <router-link to="/atm" class="btn btn-link p-0">← Go back</router-link>
    </div>

    <div class="card p-5 mx-auto shadow-lg text-center" style="max-width: 600px;">
      <!-- Step 1: Insert cash instruction -->
      <div v-if="step === 1">
        <h3 class="mb-3">Please place your bills in the cash acceptor.</h3>
        <p class="text-muted mb-4">Make sure the money is not folded</p>
        <div class="d-flex flex-column align-items-end gap-2">
          <button class="btn btn-warning fw-semibold px-4" @click="step = 2">Next</button>
          <button class="btn btn-outline-secondary px-4" @click="goBack">Cancel</button>
        </div>
      </div>

      <!-- Step 2: Enter amount -->
      <div v-else-if="step === 2">
        <h4 class="mb-4">Enter amount to deposit (€):</h4>
        <input type="number" v-model.number="amount" class="form-control text-center mb-4" min="1" step="0.01" />

        <div class="d-flex flex-column align-items-end gap-2">
          <button class="btn btn-warning fw-semibold px-4" @click="handleDeposit" :disabled="loading || !amount || amount <= 0">
            {{ loading ? 'Depositing...' : 'Deposit' }}
          </button>
          <button class="btn btn-outline-secondary px-4" @click="goBack">Cancel</button>
        </div>
      </div>

      <!-- Step 3: Success screen -->
      <div v-else-if="step === 3">
        <h3 class="mb-4 text-success">Transaction successful</h3>

        <div class="text-start ps-3">
          <p class="mb-2 text-dark"><strong>Account number:</strong><br /> <span class="text-dark">{{ result.iban }}</span></p>
          <p class="mb-2 text-dark"><strong>Amount inserted:</strong><br /> <span class="text-dark">€{{ result.amount.toFixed(2) }}</span></p>
          <p class="mb-0 text-dark"><strong>New balance:</strong><br /> <span class="text-dark">€{{ result.newBalance.toFixed(2) }}</span></p>
        </div>

        <div class="d-flex flex-column align-items-end gap-2 mt-4">
          <button class="btn btn-warning fw-semibold px-4" @click="restart">New transaction</button>
          <button class="btn btn-outline-secondary px-4" @click="goBack">Exit</button>
        </div>
      </div>

      <!-- Error -->
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios-auth';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';

const router = useRouter();
const step = ref(1);
const loading = ref(false);
const errorMessage = ref('');
const userId = jwtDecode(localStorage.getItem("token")).userId;
const amount = ref(50);  // default value

const checkingAccount = ref(null);
const result = ref({ iban: '', amount: 0, newBalance: 0 });

onMounted(async () => {
  try {
    const res = await axios.get(`/accounts/customer/${userId}`);
    checkingAccount.value = res.data.find(acc => acc.accountType === 'CHECKING');
  } catch {
    errorMessage.value = "Failed to load account info.";
  }
});

const handleDeposit = async () => {
  if (!checkingAccount.value || amount.value <= 0) {
    errorMessage.value = "Invalid amount.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    const res = await axios.post('/api/transactions/atm/deposit', {
      accountId: checkingAccount.value.accountId,
      amount: amount.value
    });
    result.value = {
      iban: checkingAccount.value.iban,
      amount: amount.value,
      newBalance: res.data.newBalance
    };
    step.value = 3;
  } catch {
    errorMessage.value = "Something went wrong with the deposit.";
  } finally {
    loading.value = false;
  }
};

const restart = () => {
  step.value = 1;
  amount.value = 50;  // reset to default
  errorMessage.value = '';
};

const goBack = () => {
  router.push('/atm');
};
</script>
