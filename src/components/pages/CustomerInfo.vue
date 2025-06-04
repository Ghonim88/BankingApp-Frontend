<template>
  <div class="page-wrapper">
        <div class="content">
      <h1 class="title">Personal Information</h1>

      <div class="info-box">
        <div class="info-row" v-for="(value, label) in visibleUserInfo" :key="label">
          <div class="label">{{ label }}</div>
          <div class="value">{{ value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const user = {
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'customer1@gmail.com',
  bsn: '123456789',
  phoneNumber: '+31612345678',
  accountStatus: 'Verified'
}

const userName = `${user.firstName} ${user.lastName}`

const visibleUserInfo = computed(() => ({
  'First Name': user.firstName,
  'Last Name': user.lastName,
  'Email': user.email,
  'BSN': user.bsn,
  'Phone': user.phoneNumber
}))
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
  margin-bottom: 2rem;
}

.info-box {
  background: white;
  padding: 2rem;
  border-radius: 0px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.label {
  font-weight: 600;
  color: #333;
}

.value {
  text-align: right;
  color: #666;
}
</style>
