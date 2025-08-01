// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'


// Use custom SCSS instead of precompiled Bootstrap CSS
import './styles/bootstrap-custom.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)



fetch('/api/i18n?lang=en', {
    headers: {
    'Accept': 'application/json'
  }
})
.then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
})
.then(data => {
    i18n.global.setLocaleMessage('en', data)
    app.use(i18n)
    app.use(router)
    app.use(VueApexCharts)
    app.mount('#app')
}).catch(err => {
    console.error('Failed to load translations:', err)
    app.use(i18n) // still mount the app with fallback messages
    app.mount('#app')})





