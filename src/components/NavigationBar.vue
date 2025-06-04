<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark px-3">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item" v-if="isLoggedIn && isApproved">
            <router-link to="/customerHome" class="nav-link">Customer Home</router-link>
          </li>
          <li class="nav-item" v-else-if="isLoggedIn && userRole === 'EMPLOYEE'">
            <router-link to="/transactions" class="nav-link">Transactions</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'EMPLOYEE'">
            <router-link to="/customers" class="nav-link">Customers</router-link>
          </li>
          <li class="nav-item" v-if="userRole === 'EMPLOYEE'">
            <router-link to="/accounts" class="nav-link">Accounts</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn && !isApproved && userRole === 'CUSTOMER'">
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ms-auto mb-2 mb-md-0">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>

          <li class="nav-item navbar-text text-light fw-semibold" v-if="isLoggedIn && fullName">
            {{ fullName }}
          </li>

          <li class="nav-item" v-if="isLoggedIn">
            <a href="#" class="nav-link text-danger" @click.prevent="handleLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { userAuthStore } from '@/stores/user-auth';
import { useCustomerStore } from '@/stores/customers';
import { jwtDecode } from 'jwt-decode';

export default defineComponent({
  name: 'CleanNavbar',
  setup() {
    const router = useRouter();
    const userAuth = userAuthStore();
    const customerStore = useCustomerStore();

    const fullName = ref('');
    const isApproved = ref(false);
    const userRole = ref(null);

    const isLoggedIn = computed(() => userAuth.isLoggedIn);

    const fetchUserInfo = async () => {
      const token = userAuth.token;
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        userRole.value = decoded.role;

        if (userRole.value === 'CUSTOMER') {
          await customerStore.fetchCustomerDetails(decoded.userId);
          const customer = customerStore.selectedCustomer;

          if (customer) {
            fullName.value = `${customer.firstName} ${customer.lastName}`;
            isApproved.value = customer.accountStatus === 'Verified';
          }
        } else if (userRole.value === 'EMPLOYEE') {
          await userAuth.fetchUserData();
          const employee = userAuth.user;
          if (employee) {
            fullName.value = `${employee.firstName} ${employee.lastName}`;
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const handleLogout = () => {
      userAuth.logout();
      router.push('/');
    };

    onMounted(() => {
      if (isLoggedIn.value) {
        fetchUserInfo();
      }
    });

    // ✅ Watch token to reactively fetch user info after login
    watch(
      () => userAuth.token,
      (newToken) => {
        if (newToken) {
          fetchUserInfo();
        }
      }
    );

    return {
      isLoggedIn,
      handleLogout,
      fullName,
      isApproved,
      userRole
    };
  }
});
</script>


<style scoped>
.navbar-text {
  margin-right: 1rem;
}
</style>

