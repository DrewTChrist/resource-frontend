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
    <img src="https://placehold.co/600x400" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"><a :href="'/resource/' + resourceId">{{ title }}</a></h5>
    </div>
  </div>
</template>

<style scoped></style>
