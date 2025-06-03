import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import EmployeeAllTransactions from "../components/pages/EmployeeAllTransactions.vue";
import AllCustomers from "@/components/pages/AllCustomers.vue";
import CustomerIndividualPage from "@/components/pages/IndividualCustomerPageEmployeeView.vue";
import ApproveCustomerAccount from "@/components/pages/ApproveCustomerAccount.vue";
// import PageNotFound from "@/components/pages/PageNotFound.vue";
// import TransferFunds from '../components/pages/TransferFunds.vue';
// import EmployeePanelPage from "../components/pages/EmployeePanelPage.vue";
// import CustomerPanelPage from "@/components/pages/CustomerPanelPage.vue";
// import AtmPanel from "@/components/atm/views/AtmPanel.vue";
// import { useAuthStore } from '@/stores/authStore';
// import SearchIbanByName from '@/components/pages/SearchIbanByName.vue';
// import LoginRegister from "@/components/pages/LoginRegister.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/home", component: Home },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    { path: "/transactions", component: EmployeeAllTransactions },
    {
      path: "/customers",
      component: AllCustomers,
      meta: { requiresAuth: true, role: "Employee" },
    }, //nothing role relating works, this one doesn t stop a customer from accessing the endpoint
    { path: "/customers/:id", component: CustomerIndividualPage, props: true },
    {
      path: "/customers/:id/approve",
      component: ApproveCustomerAccount,
      props: true,
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
