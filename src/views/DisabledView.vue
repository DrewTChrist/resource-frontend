<script setup>
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

</script>

<template>
  <div class="container">
    <h1>This account is disabled</h1>
    <button @click="sessionStore.logout" class="btn btn-primary" type="button">Logout</button>
  </div>
</template>

<style></style>
