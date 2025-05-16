<template>
  <div class="home-container">
    <h1>Welcome to the Banking App</h1>
    <p>This is a simple home page. Navigate using the menu above.</p>

    <div class="user-info" v-if="firstName">
      <h2>User Information</h2>
      <p><strong>First Name:</strong> {{ firstName }}</p>
      <p><strong>Last Name:</strong> {{ lastName }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p v-if="bsn"><strong>BSN:</strong> {{ bsn }}</p>
      <p v-if="phoneNumber"><strong>Phone Number:</strong> {{ phoneNumber }}</p>
      <p v-if="accountStatus"><strong>Account Status:</strong> {{ accountStatus }}</p>
    </div>
  </div>
</template>


<script setup>
import { onMounted, computed } from 'vue';
import { userAuthStore } from '@/stores/user-auth';

const store = userAuthStore();

onMounted(async () => {
  await store.fetchUserData(); // ✅ Load user data after login
});

const firstName = computed(() => store.firstName);
const lastName = computed(() => store.lastName);
const email = computed(() => store.email);
const userId = computed(() => store.userId);
const bsn = computed(() => store.bsn);
const phoneNumber = computed(() => store.phoneNumber);
const accountStatus = computed(() => store.accountStatus);
const role = localStorage.getItem('role'); // Get role from localStorage
</script>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 50px;
  background: white;
  padding: 20px;
}

.user-info {
  margin-top: 30px;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 12px;
}

h2 {
  color: #333;
}
p{
  color: #555;
  font-size: 16px;
  line-height: 1.5;
}
</style>
