import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import axios from 'axios'

axios.defaults.baseURL = 'https://vercel-fastapi-test-lilac.vercel.app/api'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
