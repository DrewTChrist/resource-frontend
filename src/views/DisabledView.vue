<script setup>
import { RouterLink } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
</script>

<template>
  <div class="container mt-3">
    <div class="alert alert-danger" role="alert">
      <h3 class="alert-heading">This account has been disabled: {{ sessionStore.username }}</h3>
      <hr />
      <p class="mb-0">Please contact an administrator.</p>
    </div>
    <RouterLink class="btn btn-primary" href="#" to="/login" @click="sessionStore.logout"
      >Logout</RouterLink
    >
  </div>
</template>

<style></style>
