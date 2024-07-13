import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserLoginStore = defineStore('userLoginStore', () => {
  const authenticated = ref(false)
  const authFailed = ref(false)
  const error = ref(null)
  const accessToken = ref(null)
  return { authenticated, authFailed, error, accessToken }
})
