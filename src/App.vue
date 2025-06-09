<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    Navigation,
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
