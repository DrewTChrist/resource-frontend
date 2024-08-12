<script setup>
import { ref, onMounted } from 'vue'
import { createUser, getUsers } from '../api.js'

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')
const admin = ref(false)
const disabled = ref(false)
const users = ref(null)
const loading = ref(true)

onMounted(() => {
  fetchUsers()
})

async function newUser() {
  const user = {
    first_name: firstName.value,
    last_name: lastName.value,
    username: username.value,
    password: password.value,
    admin: admin.value,
    disabled: disabled.value
  }
  await createUser(user)
}

async function fetchUsers() {
  try {
    const response = await getUsers()
    users.value = response.data
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h1>Management</h1>
    <div>
      <div>
        <h2>Server Status</h2>
      </div>
      <hr />
      <div>
        <h2>User Management</h2>
        <hr />
        <form class="mb-3">
          <h4>Create a new user:</h4>
          <div class="row">
            <div class="col">
              <div class="form-floating mb-3">
                <input
                  v-model="firstName"
                  type="text"
                  class="form-control"
                  id="new-user-first-name"
                  placeholder="First Name"
                />
                <label for="new-user-first-name">First Name</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input
                  v-model="lastName"
                  type="text"
                  class="form-control"
                  id="new-user-last-name"
                  placeholder="Last Name"
                />
                <label for="new-user-last-name">Last Name</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-floating mb-3">
                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  id="new-user-username"
                  placeholder="Username"
                />
                <label for="new-user-username">Username</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="new-user-password"
                  placeholder="Password"
                />
                <label for="new-user-password">Password</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-check form-switch mb-3">
                <input
                  v-model="admin"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="admin-switch-check"
                />
                <label class="form-check-label" for="admin-switch-check">Administrator</label>
              </div>
            </div>
            <div class="col">
              <div class="form-check form-switch mb-3">
                <input
                  v-model="disabled"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="disabled-switch-check"
                />
                <label class="form-check-label" for="disabled-switch-check">Disabled</label>
              </div>
            </div>
            <div class="col">
              <div class="d-grid gap-2 col mx-auto">
                <button @click="newUser" class="btn btn-primary" type="button">Create user</button>
              </div>
            </div>
          </div>
        </form>
        <div v-if="users">
          <ol class="list-group list-group-numbered">
            <div v-for="user in users" :key="user.username">
              <a
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
                href="#"
              >
                <div class="ms-2 me-auto">
                  <div class="fw-bold">
                    {{ user.username }}
                    <span v-if="user.admin" class="badge text-bg-primary me-2">Admin</span>
                    <span v-if="user.disabled" class="badge text-bg-warning">Disabled</span>
                  </div>
                  <p>First Name: {{ user.first_name }} - Last Name: {{ user.last_name }}</p>
                </div>
              </a>
            </div>
          </ol>
        </div>
      </div>
      <hr />
      <div>
        <h2>Server Management</h2>
        <form></form>
      </div>
      <hr />
      <div>
        <h2>Content Management</h2>
        <form></form>
      </div>
      <hr />
      <div>
        <h2>Metadata Management</h2>
        <form></form>
      </div>
      <hr />
    </div>
  </div>
</template>
