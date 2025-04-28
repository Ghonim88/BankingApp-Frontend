<template>
  <div class="registration-container">
    <h2>Customer Registration</h2>
    <form @submit.prevent="registerCustomer">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          placeholder="Customer@gmail.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        />
      </div>

      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          v-model="form.firstName"
          required
          placeholder="Enter first name"
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          v-model="form.lastName"
          required
          placeholder="Enter last name"
        />
      </div>

      <div class="form-group">
        <label for="bsn">BSN</label>
        <input
          type="text"
          id="bsn"
          v-model="form.bsn"
          required
          placeholder="Enter BSN"
        />
      </div>

      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          v-model="form.phoneNumber"
          required
          placeholder="+31612345678"
        />
      </div>

      <button type="submit" class="btn">Register</button>
      <!-- TRY to use Tostify  -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div> 
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useCustomerRegistrationStore } from '@/stores/registration';

export default defineComponent({
  name: 'Registration',
  setup() {
    // Define form fields using Vue's ref
    const form = ref({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      bsn: '',
      phoneNumber: '',
    });

    const registrationStore = useCustomerRegistrationStore();

    // Local state for error and success messages
    const errorMessage = ref('');
    const successMessage = ref('');

     // Helper function to validate if a field contains only letters, spaces, and hyphens
     const isValidName = (name) => /^[A-Za-z\s-]+$/.test(name);

    // Helper function to validate if a field contains only digits
    const isValidDigits = (value, length) => /^\d{8,9}$/.test(value) && value.length === length;


    // Register customer function using the store
    const registerCustomer = async () => {
      try {
        // Reset messages before starting
        errorMessage.value = '';
        successMessage.value = '';
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
          //reset form after successful registration
          form.value = {
            email: '',
            password: '',
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
    };
  },
});
</script>

<style scoped>
.registration-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
