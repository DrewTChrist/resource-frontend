<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  resourceId: String,
  required: true
})

//const route = useRoute()
//const loading = ref(false)
//const resourceData = ref(null)
//const error = ref(null)
//watch(() => route.params.pageId, fetchData, { immediate: true })
//async function fetchData(pageId) {}
</script>

<template>
  <div class="container">
    <h1>Resource View</h1>
    <h1>{{ resourceId }}</h1>
  </div>
</template>

<style></style>
