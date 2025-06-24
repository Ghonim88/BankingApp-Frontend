<template>
  <div class="container mt-5">
    <h2 class="mb-4">Transfer</h2>

    <div class="position-relative">
      <div class="mb-3">
        <label for="senderAccount" class="form-label">Your Account</label>
        <select
          id="senderAccount"
          class="form-select"
          v-model="form.senderIban"
        >
          <option disabled value="">Select your account</option>
          <option
            v-for="acc in customerAccounts"
            :key="acc.accountId"
            :value="acc.iban"
          >
            {{ acc.accountType }} - {{ acc.iban }}
          </option>
        </select>
      </div>
      <!-- Step 1: Form -->
      <div v-if="step === 1" class="bg-white p-4 rounded shadow-sm">
        <div class="mb-3">
          <label for="receiver" class="form-label">Receiver Name</label>
          <input
            type="text"
            id="receiver"
            v-model="receiverName"
            class="form-control"
            :readonly="isSavingsTransfer"
            @input="handleInput"
            @keydown.enter.prevent="searchReceiver"
          />
          <ul
            v-if="isDropdownVisible && matchingUsers.length"
            class="list-group mt-1"
            style="z-index: 1000; position: absolute; width: 100%"
          >
            <li
              class="list-group-item list-group-item-action"
              v-for="user in matchingUsers"
              :key="user.iban"
              @click="selectReceiver(user)"
              style="cursor: pointer"
            >
              {{ user.fullName }} - {{ user.iban }}
            </li>
          </ul>
        </div>

        <div class="mb-3">
          <label for="receiverIban" class="form-label">Receiver IBAN</label>
          <input
            type="text"
            id="receiverIban"
            v-model="form.receiverIban"
            class="form-control"
            readonly
          />
        </div>

        <div class="mb-3">
          <label for="amount" class="form-label">Amount</label>
          <input
            type="number"
            id="amount"
            v-model.number="form.amount"
            class="form-control"
            min="0"
          />
        </div>
      </div>

      <!-- Step 2: Review -->
      <div v-else class="bg-white text-black p-4 rounded shadow-sm">
        <p><strong>From:</strong> {{ form.senderIban }}</p>
        <p><strong>To:</strong> {{ form.receiverIban }}</p>
        <p><strong>Order type:</strong> Transfer</p>
        <p><strong>Execution:</strong> Immediately</p>
        <p><strong>Amount:</strong> €{{ form.amount.toFixed(2) }}</p>
      </div>

      <!-- Buttons -->
      <div class="text-end mt-3 d-flex justify-content-between">
        <button
          v-if="step === 2"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#cancelTransferModal"
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
      <div
        v-if="message"
        :class="[
          'mt-3',
          messageType === 'error' ? 'text-danger' : 'text-success',
        ]"
      >
        {{ message }}
      </div>
    </div>
    <!-- Cancel Transfer Modal -->
    <div
      class="modal fade"
      id="cancelTransferModal"
      tabindex="-1"
      aria-labelledby="cancelTransferModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cancelTransferModalLabel">
              Cancel Transfer
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Are you sure you want to cancel this transfer? All entered data will
            be lost.
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No, go back
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="cancelTransfer"
            >
              Yes, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAccountStore } from "@/stores/accounts";
import { useCustomerStore } from "@/stores/customers";
import { storeToRefs } from "pinia";
import { jwtDecode } from "jwt-decode";
import axios from "@/axios-auth";

const token = localStorage.getItem("token");
const decodedToken = jwtDecode(token);
const userId = decodedToken.userId;

const step = ref(1);
const receiverName = ref("");
const form = ref({ senderIban: "", receiverIban: "", amount: 0 });
const message = ref("");
const messageType = ref("");

const route = useRoute();
const router = useRouter();
const accountStore = useAccountStore();
const customerStore = useCustomerStore();
const { customerAccounts } = storeToRefs(accountStore);

const matchingUsers = ref([]);
const isDropdownVisible = ref(false);
const isSavingsTransfer = ref(false);

const accountId = route.params.id;

onMounted(async () => {
  await accountStore.fetchAccountsByCustomer(userId);
  const account = customerAccounts.value.find(
    (acc) => acc.accountId == accountId
  );
  if (account) form.value.senderIban = account.iban;
});

const isValid = computed(() => {
  return (
    form.value.senderIban && form.value.receiverIban && form.value.amount > 0
  );
});

const searchReceiver = async () => {
  if (isSavingsTransfer.value) return;

  try {
    const results = await customerStore.searchCustomersByName(
      receiverName.value
    );
    
    if (results.length > 0) {
      const ownIbans = customerAccounts.value.map((acc) => acc.iban);

      // Exclude own accounts
      matchingUsers.value = results.filter(
        (user) => !ownIbans.includes(user.iban)
      );

      const sender = customerAccounts.value.find(
        (acc) => acc.iban === form.value.senderIban
      );

      if (sender?.accountType.toLowerCase() === "checking") {
        const savings = customerAccounts.value.find(
          (acc) => acc.accountType.toLowerCase() === "savings"
        );

        if (savings) {
          matchingUsers.value.unshift({
            fullName: "Your Savings Account",
            iban: savings.iban,
          });
        }
      }
      isDropdownVisible.value = true;
      message.value = "";
    } else {
      matchingUsers.value = [];
      isDropdownVisible.value = false;
      form.value.receiverIban = "";
      message.value = "Receiver not found.";
      messageType.value = "error";
    }
  } catch (err) {
    matchingUsers.value = [];
    isDropdownVisible.value = false;
    form.value.receiverIban = "";
    message.value = "Receiver not found.";
    messageType.value = "error";
  }
};

const selectReceiver = (user) => {
  form.value.receiverIban = user.iban;
  receiverName.value = user.fullName;
  isDropdownVisible.value = false;
  matchingUsers.value = [];
};

let debounceTimer;
const handleInput = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchReceiver();
  }, 300); // delay to prevent rapid calls
};

watch(
  () => form.value.senderIban,
  (newIban) => {
    const sender = customerAccounts.value.find((acc) => acc.iban === newIban);

    if (sender?.accountType.toLowerCase() === "savings") {
      const checking = customerAccounts.value.find(
        (acc) => acc.accountType.toLowerCase() === "checking"
      );

      if (checking) {
        form.value.receiverIban = checking.iban;
        receiverName.value = "Your Checking Account";
        isSavingsTransfer.value = true;
        isDropdownVisible.value = false;
      } else {
        form.value.receiverIban = "";
        receiverName.value = "";
        isSavingsTransfer.value = false;
      }
    } else {
      // Reset when not savings
      form.value.receiverIban = "";
      receiverName.value = "";
      isSavingsTransfer.value = false;
    }
  }
);

const submitTransfer = async () => {
  message.value = "";
  messageType.value = "";
  const payload = {
    fromIban: form.value.senderIban,
    toIban: form.value.receiverIban,
    amount: form.value.amount,
  };
  try {
    await axios.post("/api/transactions/transfer", payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    message.value = "Transfer successful.";
    messageType.value = "success";
    step.value = 1;
    form.value = {
      senderIban: form.value.senderIban,
      receiverIban: "",
      amount: 0,
    };
    const fromAccount = customerAccounts.value.find(
      (acc) => acc.iban === form.value.senderIban
    );

    const redirectId = fromAccount?.accountId || null;

    router.push({
      path: `/bank/transactions/${redirectId}`,
      query: { successMessage: "Transfer completed successfully." },
    });
  } catch (err) {
    message.value = "Transfer failed: " + (err.response?.data || err.message);
    messageType.value = "error";
  }
};

const cancelTransfer = () => {
  const fromAccount = customerAccounts.value.find(
    (acc) => acc.iban === form.value.senderIban
  );

  const redirectId = fromAccount?.accountId || 0;

  router.push({
    path: `/bank/transactions/${redirectId}`,
    query: { successMessage: "Transfer operation cancelled." },
  });
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
.p {
  color: black;
}
.bg-white.text-black p {
  color: black !important;
}
</style>
