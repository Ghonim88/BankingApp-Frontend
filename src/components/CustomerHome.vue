<template>
  <div class="home-container">
    <div class="background-pattern"></div>
    <div class="floating-elements">
      <div class="floating-element"></div>
      <div class="floating-element"></div>
      <div class="floating-element"></div>
      <div class="floating-element"></div>
      <div class="floating-element"></div>
      <div class="floating-element"></div>
    </div>

    <div class="content-wrapper">
      <h1 class="welcome-title">Welcome to the Banking App</h1>
      <p class="welcome-subtitle">Congrats for Approval</p>

      <div class="button-group">
        <button class="btn" @click="goToBank">Bank</button>
        <button class="btn" @click="goToATM">ATM</button>
      </div>

      <div class="user-info" v-if="firstName">
        <h2>User Information</h2>
        <!-- Add user details here if needed -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { userAuthStore } from '@/stores/user-auth';
import { useRouter } from 'vue-router';

const store = userAuthStore();
const router = useRouter();

const user = computed(() => store.user);
const firstName = computed(() => user.value?.firstName || '');

function goToBank (){
  router.push(`/bank/accounts`);
}

function goToATM() {
  router.push(`/atm`);
}

</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #3c3c3c 0%, #1a1a1a 50%, #000000 100%);
  position: relative;
  overflow-x: hidden;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem; /* add some padding so it doesn’t touch edges */
  box-sizing: border-box;
  flex-direction: column;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 800px;
  text-align: center;
  /* Remove top padding and margins that interfere with centering */
  padding: 2rem;
  margin: 0 auto;
}


.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  background-image: 
    radial-gradient(circle at 20% 50%, #edcb83 1px, transparent 1px),
    radial-gradient(circle at 40% 20%, #edcb83 1px, transparent 1px),
    radial-gradient(circle at 60% 70%, #edcb83 1px, transparent 1px),
    radial-gradient(circle at 80% 30%, #edcb83 1px, transparent 1px);
  background-size: 100px 100px, 150px 150px, 120px 120px, 90px 90px;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #edcb83;
  border-radius: 50%;
  opacity: 0.6;
  animation: floatAround 15s linear infinite;
}

@keyframes floatAround {
  0% { transform: translateY(100vh) rotate(0deg); }
  100% { transform: translateY(-100vh) rotate(360deg); }
}

.floating-element:nth-child(1) { left: 10%; animation-delay: -2s; animation-duration: 12s; }
.floating-element:nth-child(2) { left: 20%; animation-delay: -4s; animation-duration: 18s; }
.floating-element:nth-child(3) { left: 30%; animation-delay: -6s; animation-duration: 14s; }
.floating-element:nth-child(4) { left: 70%; animation-delay: -8s; animation-duration: 16s; }
.floating-element:nth-child(5) { left: 80%; animation-delay: -10s; animation-duration: 13s; }
.floating-element:nth-child(6) { left: 90%; animation-delay: -12s; animation-duration: 17s; }

.content-wrapper {
  position: relative;
  z-index: 10;
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.welcome-title {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #edcb83, #f4d794);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.2;
  animation: textGlow 3s ease-in-out infinite alternate;
}

@keyframes textGlow {
  from { filter: drop-shadow(0 0 10px rgba(237, 203, 131, 0.5)); }
  to { filter: drop-shadow(0 0 20px rgba(237, 203, 131, 0.8)); }
}

.welcome-subtitle {
  font-size: 1.3rem;
  color: rgba(237, 203, 131, 0.9);
  margin-bottom: 3rem;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 3rem;
}

.btn {
  background: linear-gradient(135deg, #edcb83, #f4d794);
  border: none;
  padding: 12px 40px;
  border-radius: 24px;
  font-weight: 700;
  font-size: 1.2rem;
  color: #000;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(237, 203, 131, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 25px rgba(237, 203, 131, 0.7);
}

.user-info {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(237, 203, 131, 0.2);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  color: white;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.user-info h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 2rem 1rem;
  }

  .welcome-title {
    font-size: 2.5rem;
  }

  .welcome-subtitle {
    font-size: 1.1rem;
  }

  .btn {
    padding: 10px 30px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: 2rem;
  }

  .btn {
    padding: 8px 20px;
    font-size: 0.9rem;
  }
}
</style>
