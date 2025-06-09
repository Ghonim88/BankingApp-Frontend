<template>
  <div class="banking-welcome">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <span class="logo-text">SecureBank</span>
        </div>
      </div>
    </header>

    <!-- Main Welcome Content -->
    <main class="main-content">
      <div class="container">
        <div class="welcome-content">
          <h1 class="welcome-title">Welcome to SecureBank</h1>
          <p class="welcome-subtitle">Your trusted partner in digital banking</p>
          
          <div class="intro-text">
            <p>Experience banking redefined with our secure, fast, and user-friendly platform. 
            We're committed to providing you with the best digital banking experience, 
            putting your financial goals and security first.</p>
          </div>

          <div class="features-section">
            <h2 class="features-title">Why Choose SecureBank?</h2>
            <div class="features-list">
              <div class="feature-item">
                <h3>Secure & Safe</h3>
                <p>Bank-grade security with advanced encryption to protect your financial data</p>
              </div>
              <div class="feature-item">
                <h3>Always Available</h3>
                <p>Access your accounts 24/7 from anywhere in the world</p>
              </div>
              
            </div>
          </div>


        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 SecureBank. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.banking-welcome {
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background-color: #111111;
  padding: 1.5rem 0;
  border-bottom: 1px solid #333333;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: #edcb83;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 3rem 0;
}

.welcome-content {
  text-align: center;
  width: 100%;
}

.welcome-title {
  font-size: 3rem;
  font-weight: bold;
  color: #edcb83;
  margin-bottom: 1rem;
}

.welcome-subtitle {
  font-size: 1.3rem;
  color: #cccccc;
  margin-bottom: 2rem;
}

.intro-text {
  margin-bottom: 3rem;
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ffffff;
  max-width: 600px;
  margin: 0 auto;
}

/* Features Section */
.features-section {
  margin-bottom: 3rem;
}

.features-title {
  font-size: 2rem;
  color: #edcb83;
  margin-bottom: 2rem;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.feature-item {
  background-color: #111111;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #333333;
}

.feature-item h3 {
  font-size: 1.3rem;
  color: #edcb83;
  margin-bottom: 1rem;
}

.feature-item p {
  color: #cccccc;
  line-height: 1.5;
}

/* CTA Section */
.cta-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.cta-button.primary {
  background-color: #edcb83;
  color: #000000;
}

.cta-button.primary:hover {
  background-color: #d4b66a;
  transform: translateY(-2px);
}

.cta-button.secondary {
  background-color: transparent;
  color: #edcb83;
  border: 2px solid #edcb83;
}

.cta-button.secondary:hover {
  background-color: #edcb83;
  color: #000000;
  transform: translateY(-2px);
}

/* Footer */
.footer {
  background-color: #111111;
  padding: 1.5rem 0;
  border-top: 1px solid #333333;
  text-align: center;
}

.footer p {
  color: #cccccc;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 2.5rem;
  }

  .welcome-subtitle {
    font-size: 1.1rem;
  }

  .features-title {
    font-size: 1.7rem;
  }

  .features-list {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-item {
    padding: 1.5rem;
  }

  .cta-section {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: 2rem;
  }

  .main-content {
    padding: 2rem 0;
  }

  .intro-text p {
    font-size: 1rem;
  }
}
</style>