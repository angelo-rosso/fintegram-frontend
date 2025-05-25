// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Certificacion from '@/views/Certificacion.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
{ path: '/certificacion', name: 'Certificacion', component: Certificacion },
]

const router = createRouter({
    history: createWebHistory(),
                            routes,
                            scrollBehavior() {
                                return { top: 0, behavior: 'smooth' }
                            }
})

export default router
