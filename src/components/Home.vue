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
      <div class="welcome-section">
        <div class="welcome-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        </div>
        <h1 class="welcome-title">Welcome to SecureBank</h1>
        <p class="welcome-subtitle">Your trusted financial partner for secure banking solutions</p>
      </div>

      <div class="user-info" v-if="firstName">
        <div class="user-info-header">
          <div class="user-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2>Account Overview</h2>
        </div>
        
        <div class="user-details">
          <div class="detail-item">
            <div class="detail-label">First Name</div>
            <div class="detail-value">{{ firstName }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Last Name</div>
            <div class="detail-value">{{ lastName }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Email</div>
            <div class="detail-value">{{ email }}</div>
          </div>
          <div class="detail-item" v-if="bsn">
            <div class="detail-label">BSN</div>
            <div class="detail-value">{{ bsn }}</div>
          </div>
          <div class="detail-item" v-if="phoneNumber">
            <div class="detail-label">Phone Number</div>
            <div class="detail-value">{{ phoneNumber }}</div>
          </div>
          <div class="detail-item" v-if="accountStatus">
            <div class="detail-label">Account Status</div>
            <div class="detail-value status-badge" :class="accountStatus.toLowerCase()">
              {{ accountStatus }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { userAuthStore } from '@/stores/user-auth';

const store = userAuthStore();

onMounted(async () => {
  await store.fetchUserData(); // ✅ Load user data after login
});
onMounted(() => {
  localStorage.setItem("lockedOnHome", "true");
  console.log("User locked on home page");
});

// Access user properties through the `user` object
const user = computed(() => store.user);
const firstName = computed(() => user.value?.firstName || '');
const lastName = computed(() => user.value?.lastName || '');
const email = computed(() => user.value?.email || '');
const userId = computed(() => user.value?.userId || null);
const bsn = computed(() => user.value?.bsn || '');
const phoneNumber = computed(() => user.value?.phoneNumber || '');
const accountStatus = computed(() => user.value?.accountStatus || '');
const role = localStorage.getItem('role'); // Get role from localStorage
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #3c3c3c 0%, #1a1a1a 50%, #000000 100%);
  position: relative;
  overflow-x: hidden;
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
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background: linear-gradient(135deg, #edcb83, #f4d794);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(237, 203, 131, 0.7); }
  50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(237, 203, 131, 0); }
}

.welcome-icon svg {
  width: 40px;
  height: 40px;
  color: #000;
}

.welcome-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #edcb83, #f4d794);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  margin-bottom: 1rem;
  animation: textGlow 3s ease-in-out infinite alternate;
}

@keyframes textGlow {
  from { filter: drop-shadow(0 0 10px rgba(237, 203, 131, 0.5)); }
  to { filter: drop-shadow(0 0 20px rgba(237, 203, 131, 0.8)); }
}

.welcome-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.user-info {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(237, 203, 131, 0.2);
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.8s ease-out 0.3s both;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(237, 203, 131, 0.1), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.user-info-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(237, 203, 131, 0.2);
}

.user-avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #edcb83, #f4d794);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.user-avatar svg {
  width: 30px;
  height: 30px;
  color: #000;
}

.user-info-header h2 {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.user-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(237, 203, 131, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.detail-item:hover {
  transform: translateY(-2px);
  border-color: rgba(237, 203, 131, 0.3);
  box-shadow: 0 8px 25px rgba(237, 203, 131, 0.1);
}

.detail-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #edcb83, #f4d794);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.detail-item:hover::before {
  transform: scaleX(1);
}

.detail-label {
  font-size: 0.9rem;
  color: rgba(237, 203, 131, 0.8);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.detail-value {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
}

.status-badge.pending {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.status-badge.inactive {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
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
  
  .user-info {
    padding: 2rem;
  }
  
  .user-info-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .user-info-header h2 {
    font-size: 1.5rem;
  }
  
  .user-details {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .detail-item {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-icon {
    width: 60px;
    height: 60px;
  }
  
  .welcome-icon svg {
    width: 30px;
    height: 30px;
  }
  
  .user-avatar {
    width: 50px;
    height: 50px;
  }
  
  .user-avatar svg {
    width: 25px;
    height: 25px;
  }
}
</style>