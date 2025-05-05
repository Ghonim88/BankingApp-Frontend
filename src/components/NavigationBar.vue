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
            <a href="/" class="nav-link">Home</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a href="/register" class="nav-link">Register</a>
          </li>
          <li class="nav-item">
            <a href="/login" class="nav-link">Login</a>
          </li>
          <li class="nav-item">
            <button class="btn btn-link nav-link">Logout</button>
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
