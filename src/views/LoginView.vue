<script setup>
import { ref, watch } from 'vue'
import { authenticateUser } from '../api.js'
import { useRouter } from 'vue-router'
import { useUserLoginStore } from '@/stores/user'

const router = useRouter()
const username = ref(null)
const password = ref(null)
const submitted = ref(false)
const userLoginStore = useUserLoginStore()

// Watch for successful authentication
// redirect to home
watch(
  () => userLoginStore.authenticated,
  async (auth) => {
    if (auth) {
      router.push({ path: '/home' })
    }
  }
)

// Watch for failed authentication
// notify user
watch(
  () => userLoginStore.authFailed,
  async (failed) => {
    if (failed) {
      submitted.value = false
      userLoginStore.authFailed = false
    }
  }
)

function authenticate() {
  submitted.value = true
  authenticateUser(username.value, password.value)
}
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
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input v-model="username" type="text" class="form-control" id="exampleInputEmail1"
                  aria-describedby="emailHelp">
                <!--<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>-->
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input @keyup.enter="authenticate" v-model="password" type="password" class="form-control"
                  id="exampleInputPassword1">
                <!--<div id="passwordHelp" class="form-text">Do not reuse an old password.</div>-->
              </div>
              <div class="text-center">
                <button v-if="!submitted" @click="authenticate" type="button" class="btn btn-primary">
                  <span role="status">Submit</span>
                </button>
                <button v-else="submitted" class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status"> Loading</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>