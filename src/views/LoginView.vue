<script setup>
import { ref, watch } from 'vue'
import { authenticateUser } from '../api.js'
import { useRouter } from 'vue-router'
import { useUserLoginStore } from '@/stores/user'

const router = useRouter()
const username = ref(null)
const password = ref(null)
const userLoginStore = useUserLoginStore()

watch(
  () => userLoginStore.authenticated,
  async (auth) => {
    if (auth) {
      router.push({ path: '/home' })
    }
  }
)
</script>

<template>
  <div style="height: 100vh;">
    <div class="container d-flex h-100 justify-content-center">
      <div class="row align-items-center">
        <div class="col">
          <div class="card p-3">
            <h2 class="card-title text-center">Login</h2>
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="username" type="text" class="form-control" id="exampleInputEmail1"
                  aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
                <div id="passwordHelp" class="form-text">Do not reuse an old password.</div>
              </div>
              <div class="text-center">
                <button @click="authenticateUser(username, password)" type="button" class="btn btn-primary">
                  Submit
                  <!--<RouterLink class="nav-link" aria-current="page" href="#" to="/home">Submit</RouterLink>-->
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>