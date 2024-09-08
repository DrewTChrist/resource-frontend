<script setup></script>

<template>
  <div class="container">
    <h1>Home</h1>
    <hr />
    <div class="card">
      <div class="card-body">
        <h2 class="card-title text-center">Newest Content</h2>
      </div>
      <div id="carouselExampleCaptions" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://placehold.co/600x400" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>Title 46</h5>
              <!--<p>Some representative placeholder content for the first slide.</p>-->
            </div>
          </div>
          <div class="carousel-item">
            <!--<img src="https://placehold.co/600x400" class="d-block w-100" alt="...">-->
            <img src="https://placehold.co/600x400" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>Title 89</h5>
              <!--<p>Some representative placeholder content for the second slide.</p>-->
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://placehold.co/600x400" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>Title 120</h5>
              <!--<p>Some representative placeholder content for the third slide.</p>-->
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>
