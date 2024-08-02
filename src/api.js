import axios from 'axios'
import { useSessionStore } from '@/stores/session'

async function authenticateUser(username, password) {
  const formData = new FormData();
  formData.append('username', username)
  formData.append('password', password)
  return axios({
    method: 'post',
    url: '/auth/token',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formData
  })
}

async function getCurrentUser() {
  const sessionStore = useSessionStore()
  const accessToken = sessionStore.accessToken
  return axios({
    method: 'get',
    url: '/users/me',
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
}

async function createUser(user) {
  const sessionStore = useSessionStore()
  const accessToken = sessionStore.accessToken
  return axios({
    method: 'post',
    url: '/users/create',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    data: user
  })
}

async function getResources() {
  const sessionStore = useSessionStore()
  const accessToken = sessionStore.accessToken
  return axios({
    method: 'get',
    url: '/resources',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    data: {},
  })
}

export { authenticateUser, createUser, getCurrentUser, getResources }