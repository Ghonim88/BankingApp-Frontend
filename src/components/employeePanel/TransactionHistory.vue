<template>
  <div class="page-wrapper">
    <div class="content">

        <div class="title-bar">
             <h1 class="title">Transactions</h1>
             <button class="transfer-button">Transfer</button>
        </div>        
     
      <!-- Account Card -->
      <div class="account-card">
        <div>
          <div class="account-type">Checking account</div>
          <div class="account-iban">{{ customerName }} {{ selectedAccount?.iban }}</div>
        </div>
        <div class="account-balance">€{{ selectedAccount?.balance.toFixed(2).replace('.', ',') }}</div>
      </div>

      <!-- Search + Filters -->
      <div class="search-controls">
        <button class="filter-button"> Filters</button>
        <input class="search-box" type="text" placeholder="Search" v-model="searchTerm" />    
      </div>

      <!-- Transactions -->
      <div class="transactions-list">
        <div
          class="transaction-row"
          v-for="tx in filteredTransactions"
          :key="tx.id"
        >
          <div class="tx-left">
            <div class="tx-desc">{{ tx.description }}</div>
            <div class="tx-date">{{ formatDate(tx.date) }}</div>
          </div>
          <div class="tx-amount">- €{{ tx.amount.toFixed(2).replace('.', ',') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAccountStore } from '@/stores/accounts'

const accountStore = useAccountStore()

const customerId = 2 // Replace later with userAuthStore.user?.userId
const searchTerm = ref('')

const transactions = ref([
  { id: 1, description: 'Primera Overveen', date: '2025-05-06T14:30:00', amount: 21.5 },
  { id: 2, description: 'Primera Overveen', date: '2025-05-06T14:30:00', amount: 21.5 }
])

const customerAccounts = computed(() => accountStore.customerAccounts || [])
const selectedAccount = computed(() => customerAccounts.value[0]) // Show first account for now

const customerName = computed(() => {
  if (!selectedAccount.value || !selectedAccount.value.customer) return ''
  const { firstName, lastName } = selectedAccount.value.customer
  return `${firstName} ${lastName}`
})

const filteredTransactions = computed(() =>
  transactions.value.filter(tx =>
    tx.description.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-UK', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(() => {
  accountStore.fetchCustomerAccounts(customerId)
})
</script>


<style scoped>
.page-wrapper {
  background: #f4f4f4;
  min-height: 100vh;
  font-family: sans-serif;
}

.navbar {
  background-color: #1e2a38;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.account-card {
  background: white;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.account-type {
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.account-iban {
  font-size: 0.85rem;
  color: #666;
}

.account-balance {
  font-size: 1.15rem;
  font-weight: 600;
}

.search-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-box {
  padding: 0.4rem 0.8rem;
  border: 1px solid #888;
  border-radius: 3px;
  font-size: 0.95rem;
}

.filter-button {
  font-size: 0.9rem;
  background: none;
  border: none;
  cursor: pointer;
}

.transfer-button {
  background: #e6c77a;
  padding: 0.4rem 0.9rem;
  border-radius: 5px;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.transactions-list {
  margin-top: 1rem;
}

.transaction-row {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  background: white;
  margin-bottom: 0.75rem;
  border-radius: 6px;
}

.tx-left {
  display: flex;
  flex-direction: column;
}

.tx-desc {
  font-weight: 500;
}

.tx-date {
  font-size: 0.85rem;
  color: #666;
}

.tx-amount {
  font-weight: 500;
  font-size: 1rem;
}
</style>
