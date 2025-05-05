<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="login-title">Customer Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email" class="label">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            class="input-field"
            required
          />
        </div>

        <div class="input-group">
          <label for="password" class="label">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            class="input-field"
            required
          />
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { userAuthStore } from '@/stores/user-auth'; 

export default defineComponent({
  setup() {
    const store = userAuthStore();  // Initialize the store

    // Form data
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const isSubmitting = ref(false);

    const login = async () => {
      isSubmitting.value = true;

      try {
        await store.login(email.value, password.value);

        if (store.isLoggedIn) {
          error.value = '';
          // Redirect to dashboard if login is successful
        //  this.$router.push('/dashboard');
        } else {
          error.value = 'Login failed. Please check your credentials.';
        }
      } catch (err) {
        error.value = err.message;
      } finally {
        isSubmitting.value = false;
      }
    };

    onMounted(() => {
      if (store.isLoggedIn) {
     //   this.$router.push('/dashboard');
      }
    });

    return {
      email,
      password,
      error,
      login,
      isSubmitting,
    };
  }
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #3498db, #2ecc71);
}

.login-form {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  color: #2c3e50;
}

.input-group {
  margin-bottom: 20px;
}

.label {
  font-size: 14px;
  color: #34495e;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.4);
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.submit-btn:hover {
  background-color: #2980b9;
}
</style>
