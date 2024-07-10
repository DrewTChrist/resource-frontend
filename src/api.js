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

export { getData }
