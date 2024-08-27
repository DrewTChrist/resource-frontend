<script setup>
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

</script>

<template>
  <div class="container mt-3">
    <div class="alert alert-danger" role="alert">
      <h3 class="alert-heading">This account is disabled: {{ sessionStore.username }}</h3>
      <hr>
      <p class="mb-0">Please contact an administrator.</p>
    </div>
    <button @click="sessionStore.logout" class="btn btn-primary" type="button">Logout</button>
  </div>
</template>

<style></style>
