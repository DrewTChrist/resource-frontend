<script setup>
import { ref, watch, onMounted } from 'vue'
import { authenticateUser, getCurrentUser } from '../api.js'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const username = ref('')
const password = ref('')
const submitted = ref(false)
const invalid = ref(false)
const sessionStore = useSessionStore()


onMounted(() => {
  // skip the login page if already authenticated from before
  if (sessionStore.accessToken != null && sessionStore.authenticated) {
    router.push({ path: '/home' })
  }
})


// Watch for successful authentication
// redirect to home
watch(
  () => sessionStore.username,
  async (username) => {
    if (username) {
      router.push({ path: '/home' })
    }
  }
)

function validateForm(event) {
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
    try {
      const response = await authenticateUser(username.value, password.value, submitted)
      sessionStore.accessToken = response.data.access_token
      sessionStore.storeSession()
      sessionStore.authenticated = true
      sessionStore.error = null
    } catch (error) {
      sessionStore.authFailed = true
      sessionStore.error = error.response
    }
    try {
      const response = await getCurrentUser()
      sessionStore.storeUser(response.data)
      console.log(response.data)
    } catch (error) {
      //sessionStore.error = error.response
      //console.log(error)
    }
  }
  submitted.value = false
}
</script>

<template>
  <div style="height: 100vh">
    <div class="container d-flex h-100 justify-content-center">
      <div class="row align-items-center">
        <div class="col">
          <div class="card p-3">
            <h2 class="card-title text-center">Resource Viewer</h2>
            <form class="needs-validation" id="login-form" novalidate>
              <div class="mb-3">
                <label for="username-input" class="form-label">Username</label>
                <input :class="{ 'is-invalid': invalid, 'is-valid': invalid }" v-model="username" type="text"
                  class="form-control" id="username-input" required />
                <div class="invalid-feedback">Username field cannot be empty</div>
              </div>
              <div class="mb-3">
                <label for="password-input" class="form-label">Password</label>
                <input :class="{ 'is-invalid': invalid }" v-model="password" type="password" class="form-control"
                  id="password-input" required />
                <div class="invalid-feedback">Password field cannot be empty</div>
              </div>
              <div class="d-grid text-center mb-3">
                <button v-if="!submitted" @click="authenticate" type="submit" class="btn btn-primary">
                  <span>Login</span>
                </button>
                <button v-else class="btn btn-primary" type="submit" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status"> Loading</span>
                </button>
              </div>
              <div v-if="sessionStore.authFailed" class="alert alert-danger" role="alert">
                {{ sessionStore.error.data.detail }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
