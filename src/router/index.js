import { createRouter, createWebHistory } from 'vue-router'

const LoginView    = () => import('../domains/auth/presentation/pages/LoginView.vue')
const RegisterView = () => import('../domains/auth/presentation/pages/RegisterView.vue')
const TransportView = () => import('../domains/transport/presentation/pages/TransportView.vue')

const HomeView     = { template: '<div class="p-4"><slot/></div>' }

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/auth/login' },
        { path: '/auth/login', name: 'login', component: LoginView },
        { path: '/auth/register', name: 'register', component: RegisterView },
        { path: '/home', name: 'home', component: HomeView },
        { path: '/transport', name: 'transport', component: TransportView }

    ]
})

router.beforeEach((to) => {
    if (to.name !== 'home') return true
    try { if (!JSON.parse(localStorage.getItem('kapakid:user')||'null')) return { name:'login' } }
    catch { return { name:'login' } }
    return true
})

export default router
