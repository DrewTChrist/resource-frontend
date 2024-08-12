<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  resourceId: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="card text-center">
    <img src="https://placehold.co/600x400" class="card-img-top" alt="..." />
    <div class="card-body">
      Resource ID: {{ resourceId }}
      <h5 class="card-title">
        <RouterLink :to="{ name: 'resource', params: { resourceId: resourceId } }">{{
          title
        }}</RouterLink>
      </h5>
    </div>
  </div>
</template>

<style scoped></style>
