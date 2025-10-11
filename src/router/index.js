import { createRouter, createWebHistory } from 'vue-router'

const LoginView    = () => import('../domains/auth/presentation/pages/LoginView.vue')
const RegisterView = () => import('../domains/auth/presentation/pages/RegisterView.vue')

const HomeView=()=>import('../shared/ui/pages/HomeView.vue')
const navBar = ()=>import('../shared/presentation/components/nav-bar.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/auth/login' },
        { path: '/auth/login', name: 'login', component: LoginView },
        { path: '/auth/register', name: 'register', component: RegisterView },
        { path: '/home', name: 'home', component: navBar}


    ]
})

router.beforeEach((to) => {
    if (to.name !== 'home') return true
    try { if (!JSON.parse(localStorage.getItem('kapakid:user')||'null')) return { name:'login' } }
    catch { return { name:'login' } }
    return true
})

export default router