<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
const showManagement = ref(false)

watch(
  () => sessionStore.admin,
  async (admin) => {
    showManagement.value = admin
  }
)
</script>

<template>
  <header>
    <div class="container">
      <nav v-if="$route.meta.showNavbar" class="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Resource Viewer</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" aria-current="page" href="#" to="/home"
                  >Home</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" href="#" to="/grid/1">Grid</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" href="#" to="/about">About</RouterLink>
              </li>
              <li v-if="showManagement" class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Management
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <RouterLink class="dropdown-item" href="#" to="/management/users"
                      >Users</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink class="dropdown-item" href="#" to="/management/content"
                      >Content</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink class="dropdown-item" href="#" to="/management/metadata"
                      >Metadata</RouterLink
                    >
                  </li>
                </ul>
              </li>
            </ul>
            <div class="d-flex nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="me-2">
                  {{ sessionStore.username }}
                </span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink
                    class="dropdown-item"
                    href="#"
                    to="/login"
                    @click="sessionStore.logout"
                    >Logout
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
