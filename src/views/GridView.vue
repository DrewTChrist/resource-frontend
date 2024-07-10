<script setup>
import ResourceCard from '../components/ResourceCard.vue'
import axios from 'axios'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(false)
const resourceData = ref(null)
const error = ref(null)

watch(() => route.params.pageId, fetchData, { immediate: true })

async function fetchData(pageId) {
  error.value = resourceData.value = null
  loading.value = true
  axios({ method: 'get', url: 'https://vercel-fastapi-test-lilac.vercel.app/api/resources' })
    .then(function (response) {
      var count = response.data.pages.length
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
    <div class="card">
      <div v-if="resourceData">
        <div v-for="page in resourceData.pages" class="row">
          <div v-for="resource in page" class="col">
            <ResourceCard :title="resource.title" :resourceId="resource.id" />
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul v-if="resourceData" class="pagination justify-content-end">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li v-for="i in resourceData.count" class="page-item"><a class="page-link" :href="'/grid/' + i">{{ i }}</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style></style>