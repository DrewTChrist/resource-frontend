<script setup>
import ResourceCard from '../components/ResourceCard.vue'
import axios from 'axios'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const count = ref(0)
const loading = ref(false)
const resourceData = ref(null)
const error = ref(null)

watch(() => route.params.pageId, fetchData, { immediate: true })

async function fetchData(pageId) {
  error.value = resourceData.value = null
  loading.value = true
  axios({ method: 'get', url: 'https://vercel-fastapi-test-lilac.vercel.app/api/resources' })
    .then(function (response) {
      count.value = response.data.pages.length
      var arr = response.data.pages[route.params.pageId - 1].splice(0, 4)
      var pages = []
      while (arr.length != 0) {
        pages.push(arr)
        arr = response.data.pages[route.params.pageId - 1].splice(0, 4)
      }
      console.log(pages)
      response.data.pages = pages
      resourceData.value = response.data
      resourceData.value.count = count
      console.log(resourceData);
    })
    .catch(function (err) {
      error.value = err.toString()
      console.log(error);
    })
    .finally(function () {
      loading.value = false
    });
}
</script>

<template>
  <div class="container">
    <h1>Resources</h1>
    <!--<form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>-->
    <div class="d-grid gap-2 d-md-flex justify-content-end">
      <button type="button" class="btn btn-secondary btn-sm">
        Filter
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter"
          viewBox="0 0 16 16">
          <path
            d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
        </svg>
      </button>
    </div>
    <div class="card">
      <div v-if="resourceData">
        <div v-for="page in resourceData.pages" class="row row-cols-2 row-cols-sm-2 row-cols-md-4">
          <div v-for="resource in page" class="col">
            <ResourceCard :title="resource.title" :resourceId="resource.id" />
          </div>
        </div>
      </div>
      <div v-else="resourceData">
        <div v-for="i in 20" class="row row-cols-2 row-cols-sm-2 row-cols-md-4">
          <div v-for="j in 4" class="col">
            <ResourceCard :title="'Loading...'" :resourceId="0" />
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation">
        <ul v-if="resourceData" class="pagination justify-content-end">
          <li v-bind:class="{ 'disabled': route.params.pageId == 1 }" class="page-item">
            <RouterLink class="page-link" href="#"
              :to="{ name: 'grid', params: { pageId: parseInt(route.params.pageId) - 1 } }">Previous</RouterLink>
          </li>
          <li v-bind:class="{ 'active': route.params.pageId == i }" class="page-item" v-for="i in resourceData.count">
            <RouterLink class="page-link" href="#" :to="{ name: 'grid', params: { pageId: i } }">{{ i }}</RouterLink>
          </li>
          <li v-bind:class="{ 'disabled': route.params.pageId == count }" class="page-item">
            <RouterLink class="page-link" href="#"
              :to="{ name: 'grid', params: { pageId: parseInt(route.params.pageId) + 1 } }">Next</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style></style>