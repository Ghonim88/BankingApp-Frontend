import { defineStore } from 'pinia';
import axios from './axios-auth'; // Ensure your axios instance is properly configured
import { jwtDecode } from 'jwt-decode';

export const userAuthStore = defineStore('UserAuthStore', {
  state: () => ({
    token: localStorage.getItem('token') || '',  // Set token if already in localStorage
    email: localStorage.getItem('email') || '',
    password: localStorage.getItem('password') || '',
    bsn: localStorage.getItem('bsn') || '',
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    phoneNumber: localStorage.getItem('phoneNumber') || '',
    accountStatus: localStorage.getItem('accountStatus') || '',
    loggedIn: localStorage.getItem('loggedIn') === 'true',
  }),

  getters: {
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.loggedIn,  // Use the state value for login status
  },

  actions: {
    login(email, password) {
      return new Promise((resolve, reject) => {
        axios
          .post('/auth/login', { email: email, password: password })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('Login failed');
            }
            const data = response.data;

            if (data.token) {
              const decodedToken = jwtDecode(data.token);
              
               // Set the retrieved user data to the store and localStorage
            this.token = data.token;
            this.email = decodedToken.sub;
            this.userId = decodedToken.userId;  
              // Save data to localStorage for persistence
              localStorage.setItem('token', this.token);
              localStorage.setItem('email', this.email);
              localStorage.setItem('userId', this.userId);
             
              resolve(data); // Resolve with the response data (e.g., token)
            } else {
              reject(new Error('Invalid credentials'));
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async fetchUserData() {
      try {
        const role = localStorage.getItem('role'); // You can store it in login response or decode again
        const endpoint = role === 'CUSTOMER' ? '/customer' : '/employee';
  
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        // Now store that detailed info
        const user = response.data;
  
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.userId = user.userId;
  
        if (role === 'CUSTOMER') {
          this.bsn = user.bsn;
          this.phoneNumber = user.phoneNumber;
          this.accountStatus = user.accountStatus;
        }
  
        // Save if needed
        localStorage.setItem('firstName', this.firstName);
        localStorage.setItem('lastName', this.lastName);
        // ...
  
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    },

    logout() {
      // Clear all user data from state and localStorage
      this.token = '';
      this.email = '';
      this.password = '';
      this.bsn = '';
      this.firstName = '';
      this.lastName = '';
      this.phoneNumber = '';
      this.accountStatus = '';
      this.loggedIn = false;

      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('bsn');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('phoneNumber');
      localStorage.removeItem('accountStatus');
      localStorage.setItem('loggedIn', 'false'); // Mark loggedIn status as false

      // TODO:, navigate to the login page (if using Vue Router)
      // this.$router.push('/login');
    },

    initializeState() {
      // Initialize the state with data from localStorage (if available)
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        this.token = storedToken;
        this.email = localStorage.getItem('email');
        this.bsn = localStorage.getItem('bsn');
        this.firstName = localStorage.getItem('firstName');
        this.lastName = localStorage.getItem('lastName');
        this.phoneNumber = localStorage.getItem('phoneNumber');
        this.accountStatus = localStorage.getItem('accountStatus');
        this.loggedIn = true;
      }
    }
  }
});

// employeeDTO.setEmail("john@gmail.com");
//employeeDTO.setPassword("password");
