import axios from 'axios'

async function getData(event) {
  axios({
    method: 'get',
    url: '/items/5',
    headers: {}
  })
    .then(function (response) {
      // handle success
      console.log(response)
      document.getElementById('collapseTarget').innerHTML = JSON.stringify(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
      document.getElementById('collapseTarget').innerHTML = error.response
    })
    .finally(function () {
      // always executed
    })
}

async function authenticateUser(username, password) {
  const formData = new FormData();
  formData.append('username', username)
  formData.append('password', password)
  axios({
    method: 'post',
    url: '/token',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formData
    /*data: {
      grant_type: 'password',
      username: username,
      password: password
    }*/
  })
    .then(function (response) {
      // handle success
      console.log(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    .finally(function () {
      // always executed
    })

}

export { getData, authenticateUser }
