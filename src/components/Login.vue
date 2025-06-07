<template>
  <div class="login-page">
    <!-- Left image section -->
    <div class="login-left">
      <img src="@/assets/image/login.png" alt="Login" class="login-image" />
    </div>

    <!-- Right login form -->
    <div class="login-right">
      <div class="form-box">
        <h2 class="form-title">Customer Login</h2>
        <form @submit.prevent="login">
          <div class="input-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div v-if="error" class="error-message">{{ error }}</div>

          <button type="submit" :disabled="isSubmitting">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { userAuthStore } from "@/stores/user-auth";
import { useCustomerStore } from "@/stores/customers"; // You forgot this import
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";


export default defineComponent({
  setup() {
    const store = userAuthStore();
    const customerStore = useCustomerStore();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const error = ref("");
    const isSubmitting = ref(false);

    const login = async () => {
      isSubmitting.value = true;
      error.value = "";

      try {
        const response = await store.login(email.value, password.value);

        const token = store.token; 
        if (!token) {
          error.value = "Login failed.";
          console.log("token ",token);
          return;
        }
       
        const decoded = jwtDecode(token);
        const userRole = decoded.role;
        const userId = decoded.userId; // Get userId from the token
        
        if (userRole === "CUSTOMER") {
        const customerDetails = await customerStore.fetchCustomerDetails(userId);
        const accountStatus = customerDetails.accountStatus;
        
          if (accountStatus == "Verified") {
            router.push("/customerHome");
          } else {
            router.push("/home");
          }
        } else if (userRole === "EMPLOYEE") {
          router.push("/employeeHome");
        } else {
          error.value = "Unknown user role.";
        }
      } catch (err) {
        error.value = err.response?.status === 401
          ? "Invalid email or password."
          : "Unexpected error occurred.";
        console.error(err);
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      email,
      password,
      error,
      login,
      isSubmitting,
    };
  },
});
</script>


<style scoped>
.login-page {
  display: flex;
  height: 100vh;
  background-color: white;
}

/* Left side */
.login-left {
  flex: 1;
  background-color: #edcb83;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image {
  max-width: 100%;
  height: auto;
}

/* Right side */
.login-right {
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.form-box {
  width: 100%;
  max-width: 500px;
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.form-title {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 28px;
  font-weight: bold;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 16px;
  color: #444;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

input:focus {
  border-color: #edcb83;
  outline: none;
  box-shadow: 0 0 4px rgba(237, 203, 131, 0.4);
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
}

button {
  width: 100%;
  padding: 14px;
  background-color: #edcb83;
  color: #000;
  border: none;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e0b960;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }

  .login-left,
  .login-right {
    width: 100%;
    height: 50vh;
  }

  .form-box {
    padding: 20px;
  }
}
</style>
