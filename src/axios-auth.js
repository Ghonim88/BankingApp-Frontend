import axios from "axios";

const instance = axios.create({
 // baseURL: "http://localhost:8080/",
   baseURL: import.meta.env.VITE_API_BASE_URL,

});

 

// 🔐 Automatically attach token from localStorage
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    // If the request URL is not in nonAuthPaths, add the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

