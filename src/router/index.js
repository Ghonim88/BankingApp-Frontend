import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import CustomerHomePage from "../components/CustomerHome.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import EmployeeHomePage from "../components/employeePanel/HomeEmployee.vue";
import EmployeeAllTransactions from "../components/employeePanel/EmployeeAllTransactions.vue";
import AllCustomers from "@/components/employeePanel/AllCustomers.vue";
import CustomerIndividualPage from "@/components/employeePanel/IndividualCustomerPageEmployeeView.vue";
import ApproveCustomerAccount from "@/components/employeePanel/ApproveCustomerAccount.vue";
import Forbidden from "../components/Forbidden.vue";
import NotFound from "../components/NotFound.vue";
import { userAuthStore } from "../stores/user-auth.js"; // adjust path as needed
import AllAccounts from "@/components/employeePanel/Accounts.vue";
import AccountDetails from "@/components/employeePanel/AccountDetails.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Default routes
  { path: "/",redirect: "/login" },

  // Customer routes
  { path: "/home", component: Home, meta: { requiresAuth: true, role: "Customer" } },
  { path: "/customerHome", component: CustomerHomePage, meta: { requiresAuth: true, role: "Customer" } },
  { path: "/register", component: Register },
  { path: "/login", component: Login },


    // Employee routes
  { path: "/employeeHome", component: EmployeeHomePage, meta: { requiresAuth: true, role: "Employee" } },
  { path: "/transactions", component: EmployeeAllTransactions, meta: { requiresAuth: true, role: "Employee" } },
  { path: "/customers", component: AllCustomers, meta: { requiresAuth: true, role: "Employee" } },
    { path: "/accounts", component: AllAccounts, meta: { requiresAuth: true, role: "Employee" } },
    { path: "/accounts/:id", component: AccountDetails, meta: { requiresAuth: true, role: "Employee" }, props: true },


    // Error handling routes
  { path: "/forbidden", component: Forbidden },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },

  
    { path: "/customers/:id", component: CustomerIndividualPage, props: true },
    {
      path: "/customers/:id/approve",
      component: ApproveCustomerAccount,
      props: true,
    },
    
  ],
});

// Navigation guard to check authentication and authorization
router.beforeEach(async (to, from, next) => {
  const authStore = userAuthStore();

  // Route requires authentication
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");

    if (!token) {
     console.warn("No token found, redirecting to /login");
      return next("/login");
    }

    const userRole = localStorage.getItem('role');
    const requiredRole = to.meta.role;

    // Check if route has a specific role requirement
    if (requiredRole && userRole.toLowerCase() !== requiredRole.toLowerCase()) {
      return next("/forbidden"); // or a 403/NotAllowed page
    }

    return next();
  }

  next();

});

export default router;
