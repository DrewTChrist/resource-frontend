import axios from 'axios'
import { useUserLoginStore } from '@/stores/user'


async function authenticateUser(username, password) {
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
      const userLoginStore = useUserLoginStore()
      userLoginStore.authenticated = true
      //console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {
    })

}

export { authenticateUser }