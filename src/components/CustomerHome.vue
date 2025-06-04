<template>
  <div class="home-container">
    <h1>Welcome to the Banking App</h1>
    <p>Congrats for Approval</p>

    <div class="user-info" v-if="firstName">
      <h2>User Information</h2>
     
    </div>
  </div>
</template>


<script setup>

</script>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 50px;
  background: white;
  padding: 20px;
}

.user-info {
  margin-top: 30px;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 12px;
}

h2 {
  color: #333;
}
p{
  color: #555;
  font-size: 16px;
  line-height: 1.5;
}
h1,p{
  color: black;
}
</style>
