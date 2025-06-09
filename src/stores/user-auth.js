import { defineStore } from 'pinia';
import axios from '../axios-auth'; 
import { jwtDecode } from 'jwt-decode';
import router from '@/router';

export const userAuthStore = defineStore('UserAuthStore', {
  state: () => ({
    token: localStorage.getItem('token') || '',  
    isLoggedIn: !!localStorage.getItem('token'), 
    role: localStorage.getItem('role') || '', 
    user : null,
  }),

  getters: {
    getEmail: (state) => state.user?.email || '',
    getToken: (state) => state.token,
    getRole: (state) => state.role,
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
              const decodedToken = jwtDecode(data.token);
              this.isLoggedIn = true; // Set logged-in state
              this.token = data.token;
              this.role = decodedToken.role; 
              localStorage.setItem('role', this.role);
              
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
       
        const authorizationHeader = `Bearer ${token}`;

        try {
          const response = await axios.get('/auth/me', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization':  authorizationHeader,
            },
          });
        // Now store that detailed info
        this.user = response.data; 
      
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
      }
      catch (error) {
        console.error('Error decoding token:', error);
      }
    },

    logout() {
   
    localStorage.clear(); // Clear all localStorage items
    this.isLoggedIn = false;
    this.user = null; 
    this.role = null;
    router.push('/login');


    },  
  }
});

