import { defineStore } from 'pinia';
import axios from './axios-auth';  

export const useCustomerRegistrationStore = defineStore('CustomerRegistrationStore', {
  state: () => ({
    // Initial state for customer registration
    email: null,
    firstName: null,
    lastName: null,
    bsn: null,
    phoneNumber: null,
  }),

  actions: {
      async registerCustomer(customerData) {

        return new Promise((resolve, reject) => {
          axios
          .post('customer/register', customerData, {
            headers: {
              'Content-Type': 'application/json',  
            },
          })
          .then((response) => {
            console.log('Registration Response:', response);
            const data = response.data;
            if (data) {
              // Assuming the response contains customer data and a success status
              this.email = data.email;
              this.firstName = data.firstName;
              this.lastName = data.lastName;
              this.bsn = data.bsn;
              this.phoneNumber = data.phoneNumber;

           
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
