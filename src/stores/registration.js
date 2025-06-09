import { defineStore } from 'pinia';
import axios from '../axios-auth';  

export const useCustomerRegistrationStore = defineStore('CustomerRegistrationStore', {
  state: () => ({
    userRegistration:null,
  }),

  actions: {
      async registerCustomer(customerData) {

        return new Promise((resolve, reject) => {
          axios
          .post('auth/register', customerData, {
            headers: {
              'Content-Type': 'application/json',  
            },
          })
          .then((response) => {
            console.log('Registration Response:', response);
            const data= response.data;
            if (data) {
              this.userRegistration = data; // Store the registration data in the state

              resolve(data); // Resolve the promise with the customer data
            } else {
              reject(new Error('Registration failed, no data returned'));
            }
          })
          .catch((error) => {
            // Handle error from API
            this.registrationStatus = 'failed';
            console.error('Registration Error:', error);
            reject(error); // Reject with error message
          });
      });
    },
  },
});
