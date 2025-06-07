<template>
  <div class="registration-wrapper">
    <div class="left-panel">
      <img src="@/assets/image/register.png" alt="Register" class="register-image" />
    </div>
    <div class="right-panel">
      <div class="registration-container">
        <h2>Customer Registration</h2>
        <form @submit.prevent="registerCustomer"> 
          <div class="form-group" v-for="(label, key) in fields" :key="key">
            <label :for="key">{{ label }}</label>
            <input
              :type="(key === 'password' || key === 'confirmPassword') ? 'password' : 'text'"
              :id="key"
              v-model="form[key]"
              required
              :placeholder="placeholders[key]"
            />
          </div>

          <button type="submit" class="btn">Register</button>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref,computed } from 'vue';
import { useCustomerRegistrationStore } from '@/stores/registration';
import { userAuthStore } from "@/stores/user-auth";
import { useRouter } from "vue-router";


export default defineComponent({
  name: 'Registration',
  setup() {
    // Define form fields using Vue's ref
    const form = ref({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      bsn: '',
      phoneNumber: '',
    });
    // Define field labels and placeholders
    const fields = {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      bsn: 'BSN',
      phoneNumber: 'Phone Number',
    };
    const placeholders= {
      email: 'customer@gmail.com',
      password: 'Enter password',
      confirmPassword: 'Confirm your password',
      firstName: 'Enter first name',
      lastName: 'Enter last name',
      bsn: 'Enter BSN',
      phoneNumber: '+31612345678',
    };
    const router = useRouter();
    const registrationStore = useCustomerRegistrationStore();

    // Local state for error and success messages
    const errorMessage = ref('');
    const successMessage = ref('');

     // Helper function to validate if a field contains only letters, spaces, and hyphens
     const isValidName = (name) => /^[A-Za-z\s-]+$/.test(name);

    // Helper function to validate if a field contains only digits
    const isValidDigits = (value, length) => /^\d{8,9}$/.test(value) && value.length === length;

    // Validates strong password: min 8 chars, uppercase, lowercase, digit, special char
    const isStrongPassword = (password) => {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return pattern.test(password);
    };
    const passwordsMatch = computed(() => {
      return form.value.password === form.value.confirmPassword;
    });

    const isValidEmail = (email) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    };            

    // Register customer function using the store
    const registerCustomer = async () => {
      try {
        // Reset messages before starting
        errorMessage.value = '';
        successMessage.value = '';

        if (!isValidEmail(form.value.email)) {
        errorMessage.value = 'Please enter a valid email address.';
        return;
      }

        if (!isStrongPassword(form.value.password)) {
          errorMessage.value =
            'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.';
          return;
        }
         if (!passwordsMatch.value) {
        errorMessage.value = 'Passwords do not match.';
        return;
      }

        //Phone number validation: Must start with +316 and be 12 digits long
         if (!form.value.phoneNumber.startsWith('+316')) {
          errorMessage.value = 'Phone number must start with +316.';
          return; 
        }
        
        if (form.value.phoneNumber.length !== 12) {
          errorMessage.value = 'Phone number must be 12 characters long (including +316).';
          return; 
        }

        // Ensure the phone number contains digits after the +316
        if (!/^\+316\d{8}$/.test(form.value.phoneNumber)) {
          errorMessage.value = 'Phone number must be in the format +316XXXXXXXX, where X is a digit.';
          return; 
        }

        // Validate BSN: Must be 8 or 9 digits long and contain only digits
        if (!isValidDigits(form.value.bsn, 8) && !isValidDigits(form.value.bsn, 9)) {
          errorMessage.value = 'BSN must be 8 or 9 digits long and contain only numbers.';
          return; 
        }

        // Validate first name and last name: Only letters, spaces, and hyphens allowed
        if (!isValidName(form.value.firstName)) {
          errorMessage.value = 'First name can only contain letters, spaces, and hyphens.';
          return; 
        }

        if (!isValidName(form.value.lastName)) {
          errorMessage.value = 'Last name can only contain letters, spaces, and hyphens.';
          return; 
        }

        // Call the registerCustomer action in the store
        const response = await registrationStore.registerCustomer(form.value);

        // Check the result based on the store's response
        if (response) {
          successMessage.value = 'Registration successful!';
          const loginResponse = await userAuthStore().login(form.value.email, form.value.password);
        if (loginResponse.token) {
              await userAuthStore().fetchUserData();
              router.push('/home');
            } else {
              errorMessage.value = 'Login failed after registration. Please login manually.';
            }
          form.value = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            bsn: '',
            phoneNumber: '',
          };
        }
      } catch (error) {
        console.error(error);
        // Handle the error based on what the store provides
        if (error.response && error.response.data) {
        errorMessage.value = error.response.data;
        } else {
          // In case no error message is returned, set a default error message
          errorMessage.value = 'An error occurred. Please try again.';
        } 
      }
    };

    return {
      form,
      errorMessage,
      successMessage,
      registerCustomer,
      fields,
      placeholders,
      passwordsMatch,
    };
  },
});
</script>

 <style scoped>
.registration-wrapper {
  display: flex;
  height: 100vh;
}

.left-panel {
  flex: 1;
  background-color: #edcb83;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-image {
  width: 80%;
  max-width: 400px;
  object-fit: cover;
  transform: scale(1.1); /* Zoom in slightly */
  border-radius: 10px;
}

.right-panel {
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.registration-container {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 30px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}

input:focus {
  outline: none;
  border-color: #edcb83;
  box-shadow: 0 0 5px rgba(237, 203, 131, 0.4);
}

.btn {
  width: 100%;
  padding: 14px;
  background-color: #edcb83;
  color: black;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #d6b96e;
}

.error-message {
  color: red;
  margin-top: 15px;
  text-align: center;
}

.success-message {
  color: green;
  margin-top: 15px;
  text-align: center;
}
.match {
  border: 2px solid green;
}

.mismatch {
  border: 2px solid red;
}

.validation-text {
  color: red;
  font-size: 0.9em;
  margin-top: 4px;
}

input.match {
  border: 2px solid green;
}

input.mismatch {
  border: 2px solid red;
}

.validation-text {
  color: red;
  font-size: 0.85rem;
  margin-top: 4px;
}


</style>
