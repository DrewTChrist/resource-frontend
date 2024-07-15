import axios from 'axios'
import { useUserLoginStore } from '@/stores/user'


/*async function authenticateUser(username, password, submitted) {
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
      userLoginStore.accessToken = response.data.access_token
      //console.log(response)
    })
    .catch(function (error) {
      userLoginStore.authenticated = false
      userLoginStore.authFailed = true
      userLoginStore.error = error.response
      //console.log(error.response)
    })
    .finally(function () {
      submitted.value = false
    })
}*/

async function authenticateUser(username, password, submitted) {
  const formData = new FormData();
  formData.append('username', username)
  formData.append('password', password)
  const response = await axios({
    method: 'post',
    url: '/token',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formData
  })
  return response
  /*.then(function (response) {
    userLoginStore.authenticated = true
    userLoginStore.authFailed = false
    userLoginStore.accessToken = response.data.access_token
    //console.log(response)
  })
  .catch(function (error) {
    userLoginStore.authenticated = false
    userLoginStore.authFailed = true
    userLoginStore.error = error.response
    //console.log(error.response)
  })
  .finally(function () {
    submitted.value = false
  })*/
}

/*async function getCurrentUser() {
  const userLoginStore = useUserLoginStore()
  const accessToken = userLoginStore.accessToken
  axios({
    method: 'get',
    url: '/api/users/me',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    data: {}
  })
    .then(function (response) {
      userLoginStore.user = response.data
      //console.log(response)
    })
    .catch(function (error) {
      userLoginStore.error = error.response
      userLoginStore.user = {
        disabled: true
      }
      console.log(error.response)
    })
    .finally(function () {
    })
}*/

async function getCurrentUser() {
  const userLoginStore = useUserLoginStore()
  const accessToken = userLoginStore.accessToken
  const response = null
  try {
    response = await axios.get('/api/users/me', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    console.log(data)
  } catch (error) {
  } finally { }
  return response
}

async function createUser(user) {
  const userLoginStore = useUserLoginStore()
  const accessToken = userLoginStore.accessToken
  axios({
    method: 'post',
    url: '/api/users/create',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    data: user
  })
    .then(function (response) {
      //console.log(response)
    })
    .catch(function (error) {
      //console.log(error.response)
    })
    .finally(function () {
    })
}

async function getResources() {
  const userLoginStore = useUserLoginStore()
  const accessToken = userLoginStore.accessToken
  return axios({
    method: 'get',
    url: '/api/resources',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    data: {},
  });
}

export { authenticateUser, createUser, getCurrentUser, getResources }