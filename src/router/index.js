import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Scoring from '@/views/Scoring.vue'
import Contact from '@/views/Contact.vue'
import Education from '@/views/Education.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/scoring', name: 'Scoring', component: Scoring },
    { path: '/contact', name: 'Contacto', component: Contact },
    { path: '/education', name: 'Educación', component: Education}
]

const router = createRouter({
    history: createWebHistory(), routes,
})

export default router
