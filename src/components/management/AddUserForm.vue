<script setup>
import { ref } from 'vue'
import { createUser } from '../../api.js'

const userAdded = defineModel('userAdded')

const firstName = ref("")
const lastName = ref("")
const username = ref("")
const password = ref("")
const admin = ref(false)
const disabled = ref(false)

async function newUser() {
  const user = {
    user_id: 0,
    first_name: firstName.value,
    last_name: lastName.value,
    username: username.value,
    password: password.value,
    admin: admin.value,
    disabled: disabled.value
  }
  await createUser(user)
  userAdded.value = true
}

</script>

<template>
  <form>
    <h4>Create a new user:</h4>
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="firstName" type="text" class="form-control" id="new-user-first-name" placeholder="First Name">
          <label for="new-user-first-name">First Name</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="lastName" type="text" class="form-control" id="new-user-last-name" placeholder="Last Name">
          <label for="new-user-last-name">Last Name</label>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="username" type="text" class="form-control" id="new-user-username" placeholder="Username">
          <label for="new-user-username">Username</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating mb-3">
          <input v-model="password" type="password" class="form-control" id="new-user-password" placeholder="Password">
          <label for="new-user-password">Password</label>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-3">
      <div class="col">
        <div class="form-check form-switch mb-3">
          <input v-model="admin" class="form-check-input" type="checkbox" role="switch" id="admin-switch-check">
          <label class="form-check-label" for="admin-switch-check">Administrator</label>
        </div>
      </div>
      <div class="col">
        <div class="form-check form-switch mb-3">
          <input v-model="disabled" class="form-check-input" type="checkbox" role="switch" id="disabled-switch-check">
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
</template>