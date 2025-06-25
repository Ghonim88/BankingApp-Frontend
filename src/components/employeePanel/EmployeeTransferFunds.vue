<template>
  <div class="container mt-5">
    <router-link to="/transactions" class="text-decoration-none mb-3 d-block">
      ← Go back
    </router-link>

    <h2 class="mb-4">Transfer</h2>

    <div class="position-relative">
      <!-- Step 1: Form -->
      <div v-if="step === 1" class="bg-white p-4 rounded shadow-sm">
        <div class="mb-3">
          <label for="sender" class="form-label">Sender IBAN</label>
          <input type="text" id="sender" v-model="form.senderIban" class="form-control" />
        </div>

        <div class="mb-3">
          <label for="receiver" class="form-label">Receiver IBAN</label>
          <input type="text" id="receiver" v-model="form.receiverIban" class="form-control" />
        </div>

        <div class="mb-3">
          <label for="amount" class="form-label">Amount</label>
          <input type="number" id="amount" v-model.number="form.amount" class="form-control" min="0" />
        </div>
      </div>

      <!-- Step 2: Review -->
      <div
          v-else
          class="bg-white p-4 rounded shadow-sm"
          style="color: black !important; background-color: white !important;"
      >
        <p style="color: black !important;"><strong>From:</strong> {{ form.senderIban }}</p>
        <p style="color: black !important;"><strong>To:</strong> {{ form.receiverIban }}</p>
        <p style="color: black !important;"><strong>Order type:</strong> Transfer</p>
        <p style="color: black !important;"><strong>Execution:</strong> Immediately</p>
        <p style="color: black !important;"><strong>Amount:</strong> €{{ form.amount.toFixed(2) }}</p>
      </div>

      <!-- Buttons -->
      <div class="text-end mt-3 d-flex justify-content-between">
        <button
            v-if="step === 2"
            class="btn btn-danger"
            @click="step = 1"
        >
          Cancel operation
        </button>

        <button
            v-if="step === 1"
            class="btn btn-success"
            :disabled="!isValid"
            @click="step = 2"
        >
          Continue
        </button>

        <button
            v-if="step === 2"
            class="btn btn-success"
            @click="submitTransfer"
        >
          Send
        </button>
      </div>

      <!-- Inline Message -->
      <div v-if="message" :class="['mt-3', messageType === 'error' ? 'text-danger' : 'text-success']">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from '@/axios-auth';
import { jwtDecode } from "jwt-decode";

const step = ref(1);

const token = localStorage.getItem("token");
const decodedToken = jwtDecode(token);
const userId = decodedToken.userId;

const form = ref({
  senderIban: '',
  receiverIban: '',
  amount: 0,
});

const message = ref('');
const messageType = ref(''); // 'success' or 'error'

const isValid = computed(() => {
  return (
      form.value.senderIban.trim() !== '' &&
      form.value.receiverIban.trim() !== '' &&
      form.value.amount > 0
  );
});

const submitTransfer = async () => {
  message.value = '';
  messageType.value = '';

  const payload = {
    fromIban: form.value.senderIban,
    toIban: form.value.receiverIban,
    amount: form.value.amount,
    initiatorId: userId,
  };

  try {
    await axios.post('/api/transactions/transfer', payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    message.value = 'Transfer successful.';
    messageType.value = 'success';

    step.value = 1;
    form.value = {
      senderIban: '',
      receiverIban: '',
      amount: 0,
    };
  } catch (err) {
    message.value = err.response?.data?.message || 'Transfer failed: ' + err.message;
    messageType.value = 'error';
  }

};
</script>

<style scoped>
.container {
  max-width: 700px;
}
h2 {
  font-weight: 600;
}
.text-success {
  color: #198754;
  font-weight: 500;
}
.text-danger {
  color: #dc3545;
  font-weight: 500;

}
</style>
