import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('sessionStore', () => {
  // User fields
  const firstName = ref(null)
  const lastName = ref(null)
  const username = ref(null)
  const disabled = ref(false)
  const admin = ref(false)

  // Auth vars
  const accessToken = ref(null)
  const authenticated = ref(false)
  const authFailed = ref(false)
  const error = ref(null)

  function setValue(key, value) {
    localStorage.setItem(key, value)
  }

  function getValue(key) {
    return localStorage.getItem(key)
  }

  function retrieveSession() {
    accessToken.value = getValue('accessToken')
  }

  function storeSession() {
    if (accessToken.value != null) {
      setValue('accessToken', accessToken.value)
    }
  }

  function storeUser(user) {
    firstName.value = user.first_name
    lastName.value = user.last_name
    username.value = user.username
    disabled.value = user.disabled
    admin.value = user.admin
  }

  function reset() {
    firstName.value = null
    lastName.value = null
    username.value = null
    disabled.value = false
    admin.value = false
    accessToken.value = null
    authenticated.value = false
    authFailed.value = false
    error.value = null
  }

  function logout() {
    // remove token from localStorage
    // reset vars
    localStorage.removeItem('accessToken')
    reset()
  }

  return {
    firstName,
    lastName,
    username,
    disabled,
    admin,
    accessToken,
    authenticated,
    authFailed,
    error,
    setValue,
    getValue,
    retrieveSession,
    storeSession,
    storeUser,
    reset,
    logout
  }
})
