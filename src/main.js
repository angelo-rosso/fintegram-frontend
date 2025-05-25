// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 💡 Use your custom SCSS instead of precompiled Bootstrap CSS
import './styles/bootstrap-custom.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
