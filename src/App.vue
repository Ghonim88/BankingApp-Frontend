<template>
  <div>
    <!-- this navigation tag is a custom tag that i defined inside the script the new component -->
    <Navigation />
    <!-- <NavigationCustomer v-else-if="userRole === 'CUSTOMER'" />
    <NavigationCustomer v-else-if="userRole === 'EMPLOYEE'" /> -->
    <router-view />
    <!-- <FooterView /> -->
  </div>
</template>

<script>
import Navigation from "./components/NavigationBar.vue";
//import NavigationCustomer from "./components/NavBarCustomer.vue";
//import NavigationEmployee from "./components/NavBarEmployee.vue";

//import FooterView from './components/FooterView.vue' // TODO:

export default {
  name: "App",
  components: {
    Navigation,
    //NavigationCustomer,
    //NavigationEmployee,
    //FooterView
  },
};
</script>

<style>
body {
  /* color: black; */
  background-color: rgb(44, 44, 44);
}
p {
  color: white;
}
</style>
