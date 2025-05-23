import { defineStore } from 'pinia';
import axios from '../axios-auth'; 
import { jwtDecode } from 'jwt-decode';

export const userAuthStore = defineStore('UserAuthStore', {
  state: () => ({
    token: localStorage.getItem('token') || '',  // Set token if already in localStorage
     isLoggedIn: !!localStorage.getItem('token'), // Set to true if a token exists
      user : null
  }),

  getters: {
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
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
              localStorage.setItem('token', data.token);
              console.log('Token:', data.token);
              this.isLoggedIn = true; // Set logged-in state
              this.token = data.token;
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
        // Decode the token to get user info
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found, user not logged in');
          return;
        }

        const decodedToken = jwtDecode(token);
        const role = decodedToken.role; 
        const authorizationHeader = `Bearer ${token}`;

        console.log('Authorization Header:', authorizationHeader);

        try {
          const response = await axios.get('/auth/me', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization':  authorizationHeader,
            },
          });
        
        // Now store that detailed info
        this.user = response.data; 
     
        console.log('User data fetched successfully:', this.user);
  
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
      }
      catch (error) {
        console.error('Error decoding token:', error);
      }
    },

    logout() {
    
     localStorage.removeItem('token');
     this.isLoggedIn = false;
    this.user = null; // Reset the user object

      this.$reset();
     window.location.href = '/login';

    },  
  }
});

// employeeDTO.setEmail("john@gmail.com");
//employeeDTO.setPassword("password");
