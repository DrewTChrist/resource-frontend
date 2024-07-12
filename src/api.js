import axios from 'axios'
import { useUserLoginStore } from '@/stores/user'


async function authenticateUser(username, password) {
  const userLoginStore = useUserLoginStore()
  const formData = new FormData();
  formData.append('username', username)
  formData.append('password', password)
  axios({
    method: 'post',
    url: '/token',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formData
  })
    .then(function (response) {
      userLoginStore.authenticated = true
      userLoginStore.authFailed = false
      //console.log(response)
    })
    .catch(function (error) {
      userLoginStore.authenticated = false
      userLoginStore.authFailed = true
      console.log(error)
    })
    .finally(function () {
    })
}

export { authenticateUser }