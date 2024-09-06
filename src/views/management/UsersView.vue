<script setup>
import { ref, computed, onBeforeMount, shallowRef, watch } from 'vue'
import { getUsers, removeUser } from '@/api.js'
import { useSessionStore } from '@/stores/session'
import UserList from '@/components/management/UserList.vue'
import AddUserForm from '@/components/management/AddUserForm.vue'
import EditUserForm from '@/components/management/EditUserForm.vue'

/*------------------------------------------------------------------------------
variables
------------------------------------------------------------------------------*/
const sessionStore = useSessionStore()
const formComponent = shallowRef(UserList)
const users = ref([])
const model = ref({ selectedUsers: {} })
const userAdded = ref(false)

/*------------------------------------------------------------------------------
lifecycle hooks
------------------------------------------------------------------------------*/
onBeforeMount(async () => {
  await refreshUsers()
})

/*------------------------------------------------------------------------------
watchers
------------------------------------------------------------------------------*/
watch(userAdded, async (newValue, oldValue) => {
  if (newValue) {
    formComponent.value = UserList
    userAdded.value = false
    await refreshUsers()
  }
})

/*------------------------------------------------------------------------------
computed properties 
------------------------------------------------------------------------------*/
const showBackButton = computed(() => {
  return formComponent.value.__name == UserList.__name
})

const selectedUsers = computed(() => {
  return Object.keys(model.value.selectedUsers).length
})

const isCurrentUserSelected = computed(() => {
  if (selectedUsers.value == 1) {
    return (
      sessionStore.username ==
      model.value.selectedUsers[Object.keys(model.value.selectedUsers)[0]].username
    )
  } else {
    return false
  }
})

/*------------------------------------------------------------------------------
functions
------------------------------------------------------------------------------*/
async function refreshUsers() {
  const response = await getUsers()
  users.value = response.data
  model.value = { selectedUsers: {} }
}

async function deleteSelectedUsers() {
  for (const key in model.value.selectedUsers) {
    const user = model.value.selectedUsers[key]
    await removeUser(user)
  }
  await refreshUsers()
}
</script>

<template>
  <div class="container">
    <h2>User Management</h2>
    <div class="d-flex flex-row-reverse" :class="{ 'd-none': !showBackButton }">
      <button
        class="btn btn-primary me-3"
        :disabled="selectedUsers == 0 || isCurrentUserSelected"
        role="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Delete
      </button>
      <button
        class="btn btn-primary me-3"
        :disabled="!(selectedUsers == 1)"
        @click="formComponent = EditUserForm"
        role="button"
      >
        Edit
      </button>
      <button
        class="btn btn-primary me-3"
        :disabled="selectedUsers > 0"
        @click="formComponent = AddUserForm"
        role="button"
      >
        Add
      </button>
    </div>
    <div class="d-flex flex-row-reverse" :class="{ 'd-none': showBackButton }">
      <button class="btn btn-primary me-3" @click="formComponent = UserList" role="button">
        Back
      </button>
    </div>
    <hr />
    <KeepAlive exclude="EditUserForm" max="2">
      <component
        :is="formComponent"
        v-bind="{ users: users, user: model.selectedUsers[Object.keys(model.selectedUsers)[0]] }"
        v-model:model="model"
        v-model:userAdded="userAdded"
      >
      </component>
    </KeepAlive>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete users</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <span>Are you sure you want to delete these users?</span>
            <ul>
              <li v-for="user in model.selectedUsers" :key="user.username">{{ user.username }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              @click="deleteSelectedUsers"
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Yes
            </button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
