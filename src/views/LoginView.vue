<script setup>
import { ref, watch } from 'vue'
import { authenticateUser, getCurrentUser } from '../api.js'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useUserLoginStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
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
    if (auth) {
      router.push({ path: '/home' })
    }
  }
)

/*onBeforeRouteLeave(async (to, from) => {
  await getCurrentUser()
})*/

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
    //await authenticateUser(username.value, password.value, submitted)
    try {
      const response = await authenticateUser(username.value, password.value, submitted)
      userLoginStore.accessToken = response.data.access_token
      userLoginStore.authenticated = true
    } catch (error) {
      userLoginStore.authFailed = true
      userLoginStore.error = error
    }
    try {
      const user = await getCurrentUser()
      userLoginStore.user = user.data
      console.log(user.data)
    } catch (error) {

    }
  }
  submitted.value = false
}
</script>

<template>
  <div style="height: 100vh;">
    <div class="container d-flex h-100 justify-content-center">
      <div class="row align-items-center">
        <div class="col">
          <div class="card p-3">
            <h2 class="card-title text-center">Resource Viewer</h2>
            <form class="needs-validation" id="login-form" novalidate>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input :class="{ 'is-invalid': invalid, 'is-valid': invalid }" v-model="username" type="text"
                  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                <!--<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>-->
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input :class="{ 'is-invalid': invalid }" v-model="password" type="password" class="form-control"
                  id="exampleInputPassword1" required>
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