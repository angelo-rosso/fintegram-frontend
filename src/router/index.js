import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Scoring from '@/views/Scoring.vue'
import Contact from '@/views/Contact.vue'
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/scoring', name: 'Scoring', component: Scoring },
    { path: '/contact', name: 'Contacto', component: Contact }
// other routes...
]

const router = createRouter({
    history: createWebHistory(), routes,
})

export default router
