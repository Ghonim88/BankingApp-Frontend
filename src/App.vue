<template>
  <div>
    <!-- this navigation tag is a custom tag that i defined inside the script the new component -->
    <Navigation />
    <router-view />
    <FooterView />
  </div>
</template>

<script>
import Navigation from './components/NavigationBar.vue' //TODO:
//import FooterView from './components/FooterView.vue' // TODO:

export default {
  name: 'App',
  components: {
    Navigation,
    //FooterView
  }
}
</script>

<style>
body {
  /* color: black; */
  background-color: rgb(44, 44, 44);
}
p{
  color: white;
}
</style>
