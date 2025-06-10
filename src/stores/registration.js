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
            const data= response.data;
            if (data) {
              this.userRegistration = data;

              resolve(data); 
            } else {
              reject(new Error('Registration failed, no data returned'));
            }
          })
          .catch((error) => {
            // Handle error from API
            this.registrationStatus = 'failed';
            console.error('Registration Error:', error);
            reject(error); 
          });
      });
    },
  },
});
