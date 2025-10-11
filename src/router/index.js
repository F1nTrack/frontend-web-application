import { createRouter, createWebHistory } from 'vue-router'

const LoginView    = () => import('../domains/auth/presentation/pages/LoginView.vue')
const RegisterView = () => import('../domains/auth/presentation/pages/RegisterView.vue')

//const HomeView=()=>import('../domains/dashboard-context/HomeView.vue')

const HomeView     = () => import('../domains/dashboard-context/HomeView.vue')
//const PruebaView   = () => import('../views/PruebaView.vue')
const DocumentsView = () => import('../domains/documents/DocumentManagementView.vue')

//const PruebaView=()=>import('../views/PruebaView.vue')

//const navBar = ()=>import('../shared/presentation/components/nav-bar.vue')
function getSession() {
    try {
        return JSON.parse(localStorage.getItem('kapakid:user') || 'null')
    } catch {
        return null
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', redirect: { name: 'login' } },
        {
            path: '/auth/login',
            name: 'login',
            component: LoginView,
            meta: { guestOnly: true },
        },
        {
            path: '/auth/register',
            name: 'register',
            component: RegisterView,
            meta: { guestOnly: true },
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true },
        },
        {
            path: '/documents',
            name: 'documents',
            component: DocumentsView,
            meta: { requiresAuth: true },
        },
    ],
})
router.beforeEach((to) => {
    //const session = getSession()
    //const requiresAuth = to.matched.some(record => record.meta?.requiresAuth)
    //const isGuestOnly = to.matched.some(record => record.meta?.guestOnly)
    const session = getSession()
    const requiresAuth = to.matched.some(record => record.meta?.requiresAuth)
    const isGuestOnly = to.matched.some(record => record.meta?.guestOnly)
    if (requiresAuth && !session) {
        return {
            name: 'login',
            query: to.fullPath && to.fullPath !== '/' ? { redirect: to.fullPath } : undefined,
        }
    }

    if (session && isGuestOnly) {
        return { name: 'home' }
    }

    return true
})

//export default router
export default router
