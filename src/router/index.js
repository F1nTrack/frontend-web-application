
import { createRouter, createWebHistory } from 'vue-router'

const LoginView = () => import('../domains/auth/presentation/pages/LoginView.vue')
const RegisterView = () => import('../domains/auth/presentation/pages/RegisterView.vue')
const HomeView = () => import('../domains/dashboard-context/HomeView.vue')
const PruebaView = () => import('../views/PruebaView.vue')
const TechnicalSupportView = () => import('../views/TechnicalSupportView.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/auth/login' },
        { path: '/auth/login', name: 'login', component: LoginView },
        { path: '/auth/register', name: 'register', component: RegisterView },
        { path: '/home', name: 'home', component: HomeView },
        { path: '/support', name: 'support', component: TechnicalSupportView },
        { path: '/prueba', name: 'prueba', component: PruebaView }
    ]
})

router.beforeEach((to) => {
    if (to.name !== 'home') return true
    try { if (!JSON.parse(localStorage.getItem('kapakid:user')||'null')) return { name:'login' } }
    catch { return { name:'login' } }
    return true
})

export default router
