<script setup>
import { ref, watch } from 'vue'
import { authenticateUser } from '../api.js'
import { useRouter } from 'vue-router'
import { useUserLoginStore } from '@/stores/user'

const router = useRouter()
const username = ref("")
const password = ref("")
const submitted = ref(false)
const invalid = ref(false)
const userLoginStore = useUserLoginStore()

// Watch for successful authentication
// redirect to home
watch(
  () => userLoginStore.authenticated,
  async (auth) => {
    //submitted.value = false
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
    //submitted.value = false
    if (failed) {
      //userLoginStore.authFailed = false
    }
  }
)

function validateForm() {
  if (username.value.length == 0 || password.value.length == 0) {
    invalid.value = true
    event.preventDefault()
    event.stopPropagation()
  } else {
    invalid.value = false
  }
}

async function authenticate(event) {
  validateForm(event)
  if (!invalid.value) {
    submitted.value = true
    await authenticateUser(username.value, password.value, submitted)
  }
  //submitted.value = false
}
</script>

<template>
  <div style="height: 100vh;">
    <div class="container d-flex h-100 justify-content-center">
      <div class="row align-items-center">
        <div class="col">
          <div class="card p-3">
            <h2 class="card-title text-center">Resource Viewer</h2>
            <!--<p>Submitted: {{ submitted }}</p>
            <p>Authenticated: {{ userLoginStore.authenticated }}</p>
            <p>Auth Failed: {{ userLoginStore.authFailed }}</p>-->
            <form class="needs-validation" id="login-form" novalidate>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input :class="{ 'is-invalid': invalid, 'is-valid': invalid }" v-model="username" type="text"
                  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                <!--<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>-->
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input :class="{ 'is-invalid': invalid }" @keyup.enter="authenticate" v-model="password" type="password"
                  class="form-control" id="exampleInputPassword1" required>
                <!--<div id="passwordHelp" class="form-text">Do not reuse an old password.</div>-->
              </div>
              <div class="d-grid text-center mb-3">
                <button v-if="!submitted" @click="authenticate" type="submit" class="btn btn-primary">
                  <span>Login</span>
                </button>
                <button v-else="submitted" class="btn btn-primary" type="submit" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status"> Loading</span>
                </button>
              </div>
              <div v-if="userLoginStore.authFailed" class="alert alert-danger" role="alert">
                {{ userLoginStore.error.data.detail }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>