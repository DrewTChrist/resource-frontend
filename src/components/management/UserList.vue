<script setup>
import { computed } from 'vue'

defineOptions({
  // this gets rid of the extraneous non-props warning
  inheritAttrs: false
})

const model = defineModel('model')

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

const loaded = computed(() => {
  return props.users && props.users.length > 0
})

function updateSelectList(event, user) {
  if (event.target.checked) {
    model.value.selectedUsers[user.username] = user
  } else {
    delete model.value.selectedUsers[user.username]
  }
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Username</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Admin</th>
        <th scope="col">Disabled</th>
      </tr>
    </thead>
    <tbody v-if="loaded">
      <tr v-for="user in users" :key="user.username">
        <th scope="row">
          <input @change="(event) => updateSelectList(event, user)" class="form-check-input" type="checkbox"
            id="flexCheckDefault" />
        </th>
        <td>{{ user.username }}</td>
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <td v-if="user.admin"><span class="badge text-bg-primary">Admin</span></td>
        <td v-else></td>
        <td v-if="user.disabled"><span class="badge text-bg-warning">Disabled</span></td>
        <td v-else></td>
      </tr>
    </tbody>
  </table>
  <div v-if="!loaded" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
