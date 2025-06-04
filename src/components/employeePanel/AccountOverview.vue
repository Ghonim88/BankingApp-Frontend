<template>
  <div class="page-wrapper">
     <div class="content">
      <h1 class="title">Overview</h1>

      <div class="account-card" v-for="account in customerAccounts" :key="account.accountId">
        <div class="account-info">
          <div class="account-type">
            {{ account.accountType === 'CHECKING' ? 'Checking account' : 'Savings account' }}
          </div>
          <div class="account-iban">
            {{ userName }} {{ account.iban }}
          </div>
        </div>
        <div class="account-balance">
          €{{ account.balance.toFixed(2).replace('.', ',') }}
        </div>
      </div>

      <div class="total-balance">
        Total balance: €{{ totalBalance.toFixed(2).replace('.', ',') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
// import { userAuthStore } from '@/stores/user-auth'
import { useAccountStore } from '@/stores/accounts'

const accountStore = useAccountStore()

const customerId = 2
const userName = 'Alice Johnson'

const customerAccounts = computed(() => accountStore.customerAccounts || [])
const totalBalance = computed(() =>
  customerAccounts.value.reduce((sum, acc) => sum + acc.balance, 0)
)

onMounted(() => {
  if (customerId) {
    accountStore.fetchCustomerAccounts(customerId)
  }
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

.nav-title {
  font-weight: 500;
}

.nav-user {
  font-size: 0.9rem;
}

.content {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.account-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.25rem;
  border-radius: 0px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
}

.account-info {
  display: flex;
  flex-direction: column;
}

.account-type {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.account-iban {
  font-size: 0.85rem;
  color: #666;
}

.account-balance {
  font-size: 1.15rem;
  font-weight: 600;
}

.total-balance {
  background: #d1d1d1;
  padding: 1rem 1.5rem;
  border-radius: 0px;
  text-align: right;
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 2rem;
}
</style>
