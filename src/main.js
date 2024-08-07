import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './migrate' // Import the migration script

import App from './App.vue'
import router from './router'

// bootsrap(css/js)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// bootsrap icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// import '@/assets/'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
