<script setup>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'

function getData(event) {
  axios({ method: 'get', url: 'https://json.extendsclass.com/bin/fc92c15b4f70' })
    .then(function (response) {
      // handle success
      console.log(response);
      document.getElementById("collapseTarget").innerHTML = JSON.stringify(response);
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
  <header>
    <div class="container">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" aria-current="page" href="#" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" href="#" to="/grid/1">Grid</RouterLink>
              </li>
              <li class="nav-item">
                  <RouterLink class="nav-link" href="#" to="/about">About</RouterLink>
              </li>
            </ul>
            <!--<form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>-->
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>