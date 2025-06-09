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
import AllAccounts from "@/components/employeePanel/Accounts.vue";
import AccountDetails from "@/components/employeePanel/AccountDetails.vue";
import Welcome from "@/components/Welcome.vue";
import EmployeeTransferFunds from "@/components/employeePanel/EmployeeTransferFunds.vue";
import CustomerAccounts from "@/components/customerPages/CustomerAccounts.vue";
import CustomerTransactions from "@/components/customerPages/CustomerTransactionsForAccount.vue";
import CustomerTransfer from "@/components/customerPages/CustomerTransfer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //history: createWebHistory('/BankingApp-Frontend/'),
  routes: [
    // Default routes
  { path: "/",redirect: "/login" },
  {path: "/welcome", component: Welcome}, // Welcome page route

  // Customer routes
  { path: "/home", component: Home, meta: { requiresAuth: true, role: "Customer" } },
  { path: "/customerHome", component: CustomerHomePage, meta: { requiresAuth: true, role: "Customer" } },
  { path: "/bank/accounts", component: CustomerAccounts, meta: { requiresAuth: true, role: "Customer" } },
  { path: "/bank/transactions/:id", component: CustomerTransactions, meta: { requiresAuth: true, role: "Customer" } },
  { path: "/bank/transactions/new", component: CustomerTransfer, meta: { requiresAuth: true, role: "Customer" } },
  { path: "/register", component: Register },
  { path: "/login", component: Login },


    // Employee routes
  { path: "/employeeHome", component: EmployeeHomePage, meta: { requiresAuth: true, role: "Employee" } },
  { path: "/transactions", component: EmployeeAllTransactions, meta: { requiresAuth: true, role: "Employee" } },
  { path: "/customers", component: AllCustomers, meta: { requiresAuth: true, role: "Employee" } },
  { path: "/accounts", component: AllAccounts, meta: { requiresAuth: true, role: "Employee" } },
  { path: "/accounts/:id", component: AccountDetails, meta: { requiresAuth: true, role: "Employee" }, props: true },
    { path: "/transactions/new", component: EmployeeTransferFunds, meta: { requiresAuth: true, role: "Employee" } },

    // Error handling routes
  { path: "/forbidden", component: Forbidden },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },

  
    { path: "/customers/:id", component: CustomerIndividualPage,
      meta: { requiresAuth: true, role: "Employee" },
       props: true },
    {
      path: "/customers/:id/approve",
      component: ApproveCustomerAccount,
      meta: { requiresAuth: true, role: "Employee" },
      props: true,
    },
    
  ],
});

// Navigation guard to check authentication and authorization
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

const lockedOnHome = localStorage.getItem("lockedOnHome");

  if (lockedOnHome && to.path !== "/home") {
    console.warn("Navigation blocked: locked on /home");
    return next("/home");
  }
  

  // 🚫 Block logged-in users from accessing /register or /login
  if ((to.path === "/register" || to.path === "/login") && token) {
    if (userRole.toLowerCase() === "customer") {
      return next("/customerHome");
    } else if (userRole.toLowerCase() === "employee") {
      return next("/employeeHome");
    } else {
      return next("/welcome"); // Redirect to welcome page if role is unknown
    }
  }

  // ✅ Route requires authentication
  if (to.meta.requiresAuth) {
    if (!token) {
      console.warn("No token found, redirecting to /login");
      return next("/login");
    }

    const requiredRole = to.meta.role;

    if (requiredRole && userRole.toLowerCase() !== requiredRole.toLowerCase()) {
      return next("/forbidden");
    }

    return next(); // Auth and role valid
  }

  return next(); // Route does not require auth


});

export default router;