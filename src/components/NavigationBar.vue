<template>
  <nav class="navbar navbar-expand-md navbar-dark mb-4">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a href="#" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Customers</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Transfer Funds</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">All Transactions</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a href="#" class="nav-link">Login / Register</a>
          </li>
          <li class="nav-item d-flex align-items-center">
            <span class="navbar-text me-3">user@example.com (EMPLOYEE)</span>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Profile</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Search Customer's IBAN</a>
          </li>
          <li class="nav-item">
            <button class="btn btn-link nav-link">Logout</button>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">ATM</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "CleanNavbar",
};
</script>

<style scoped>
.navbar {
  background-color: #30323d;
}

.navbar-nav.ms-auto {
  margin-left: auto;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.navbar-text {
  color: #fff;
  margin-right: 1rem;
}

.navbar .nav-link,
.navbar .btn-link {
  color: #fff;
}

.navbar .nav-link.active {
  font-weight: bold;
}

.bi-person-circle {
  font-size: 2rem;
  cursor: pointer;
}
</style>
