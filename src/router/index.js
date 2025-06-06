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


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/home", component: Home },
    {path: "/customerHome", component: CustomerHomePage}, // Assuming this is the same as /home
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    { path: "/employeeHome", component: EmployeeHomePage, meta: { requiresAuth: true, role: "Employee" } },
    { path: "/transactions", component: EmployeeAllTransactions },
    {
      path: "/customers",
      component: AllCustomers,
      meta: { requiresAuth: true, role: "Employee" },
    },
    { path: "/customers/:id", component: CustomerIndividualPage, props: true },
    {
      path: "/customers/:id/approve",
      component: ApproveCustomerAccount,
      props: true,
    },
    {
      path: "/accounts",
      component: () => import("@/components/employeePanel/Accounts.vue"),
      meta: { requiresAuth: true, role: "Employee" }
    },
    {
      path: "/accounts/:id",
      component: () => import("@/components/employeePanel/AccountDetails.vue"),
      props: true,
      meta: { requiresAuth: true, role: "Employee" }
    },


    // { path: '/404', component: PageNotFound },
    // { path: '/login-register', component: LoginRegister },
    // { path: '/employeepanel', component: EmployeePanelPage, meta: { requiresAuth: true, role: 'Employee' } },
    // { path: '/customerpanel/:id', component: CustomerPanelPage, props: true, meta: { requiresAuth: true, role: 'Customer' } },
    // { path: '/search-customer-iban', component: SearchIbanByName },
    // { path: '/transferfunds', component: TransferFunds },

    // { path: '/atm', component: AtmPanel }, // Added ATM panel route
    // { path: '/:catchAll(.*)', redirect: '/404' } // Redirect unknown routes to 404
  ],
});

// router.beforeEach((to, from, next) => {
//   const store = useAuthStore();
//   const isLoggedIn = store.isLoggedIn;
//   const userRole = store.role || localStorage.getItem('role');

//   if (isLoggedIn && userRole === 'ATM' && to.path !== '/atm') {
//     next('/atm'); // Redirect to /atm if logged in as ATM and trying to access other routes
//   } else {
//     next();
//   }
// });

export default router;
