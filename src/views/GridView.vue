<script setup>
import ResourceCard from '../components/ResourceCard.vue'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getResources } from '../api.js'

const COLS = 4;
// const ROWS = 5;
const resources = ref([])

const route = useRoute()
const numPages = ref(1)
const loaded = ref(false)
const error = ref(null)

const currentPage = computed(() => {
  return route.params.pageId
})

watch(
  () => route.params.pageId,
  () => {
    fetchData()
    resources.value = []
  },
  { immediate: true }
)


async function fetchData() {
  try {
    const response = await getResources()
    const iterations = Math.ceil(response.data.length / COLS)
    for (var i = 0; i <= iterations; i++) {
      var row = response.data.splice(0, COLS)
      resources.value.push(row)
    }
  } catch (error) {
    error.value = error
    console.log(error)
  } finally {
    loaded.value = true
  }
}

</script>

<template>
  <div class="container">
    <h1>Resources</h1>
    <hr>
    <div class="d-grid gap-2 d-md-flex justify-content-end mb-3">
      <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="collapse" data-bs-target="#filter-collapse"
        aria-expanded="false" aria-controls="filter-collapse">
        Filter
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter"
          viewBox="0 0 16 16">
          <path
            d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
        </svg>
      </button>
    </div>
    <div class="card collapse mb-3" id="collapseTarget">
      This is the toggle-able content!
    </div>
    <div class="collapse" id="filter-collapse">
      <div class="card card-body mb-3">
        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user
        activates the relevant trigger.
      </div>
    </div>
    <div>
      <div v-if="resources.length == 0" class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-for="row in resources" :key="row" class="row row-cols-2 row-cols-sm-2 row-cols-md-4">
        <div v-for="resource in row" :key="resource.resource_id" class="col">
          <ResourceCard :title="resource.name" :resourceId="resource.resource_id" class="mb-3" />
        </div>
      </div>
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-end">
          <li v-bind:class="{ 'disabled': currentPage == 1 }" class="page-item">
            <RouterLink class="page-link" href="#"
              :to="{ name: 'grid', params: { pageId: parseInt(currentPage) - 1 } }">Previous</RouterLink>
          </li>
          <li v-bind:class="{ 'active': currentPage == i }" class="page-item" v-for="i in numPages" :key="i">
            <RouterLink class="page-link" href="#" :to="{ name: 'grid', params: { pageId: i } }">{{ i }}</RouterLink>
          </li>
          <li v-bind:class="{ 'disabled': currentPage == numPages }" class="page-item">
            <RouterLink class="page-link" href="#"
              :to="{ name: 'grid', params: { pageId: parseInt(currentPage) + 1 } }">Next</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style></style>