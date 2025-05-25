import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Contact from '@/views/Contact.vue'
import Education from '@/views/Education.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/contact', name: 'Contacto', component: Contact },
    { path: '/education', name: 'Educacion', component: Education }
// other routes...
]

const router = createRouter({
    history: createWebHistory(), routes,
})

export default router
