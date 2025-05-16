<template>
  <nav class="navbar navbar-expand-md navbar-dark">
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
          <li class="nav-item">
            <a href="/" class="nav-link">Home</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a href="/register" class="nav-link">Register</a>
          </li>
          <li class="nav-item">
            <a href="/login" class="nav-link">Login</a>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a href="#" class="nav-link" @click.prevent="handleLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { userAuthStore } from '@/stores/user-auth';

export default defineComponent({
  name: "CleanNavbar",
  setup() {
    const userAuth = userAuthStore();

    // Computed property to check if the user is logged in
    const isLoggedIn = computed(() => userAuth.isLoggedIn);

    // Method to handle logout
    const handleLogout = () => {
      userAuth.logout();
    };

    return {
      isLoggedIn,
      handleLogout,
    };
  },
});
</script>


<style scoped>
.navbar {
  background-color: #30323d;
}

.navbar-nav.ms-auto {
  margin-left: auto;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.navbar-text {
  color: #fff;
  margin-right: 1rem;
}

.navbar .nav-link,
.navbar .btn-link {
  color: #fff;
}

.navbar .nav-link.active {
  font-weight: bold;
}

.bi-person-circle {
  font-size: 2rem;
  cursor: pointer;
}
</style>
