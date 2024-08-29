import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
