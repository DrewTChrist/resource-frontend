<script setup>
import axios from 'axios'

async function getData(event) {
  axios({
    method: 'get',
    url: 'https://vercel-fastapi-test-lilac.vercel.app/items/5',
    headers: {}
  }).then(function (response) {
    // handle success
    console.log(response);
    document.getElementById("collapseTarget").innerHTML = JSON.stringify(response.data);
  })
    .catch(function (error) {
      // handle error
      console.log(error);
      document.getElementById("collapseTarget").innerHTML = error.response;
    })
    .finally(function () {
      // always executed
    });
}
</script>

<template>
  <div class="container">
    <h1>Home</h1>
    <div class="card">
      <p>Content</p>
      <!--<button id="mybutton" @click="getData" class="btn btn-primary" data-bs-target="#collapseTarget"
        data-bs-toggle="collapse">
        Bootstrap collapse
      </button>
      <div class="collapse py-2" id="collapseTarget">
        This is the toggle-able content!
      </div>-->
    </div>
  </div>
</template>