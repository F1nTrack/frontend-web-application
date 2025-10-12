
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
        { path: '/documents', name: 'documents', component: () => import('../domains/documents/DocumentsView.vue') },
        { path: '/payments', name: 'payments', component: () => import('../domains/payments/PaymentsView.vue') },
        { path: '/transport', name: 'transport', component: () => import('../domains/transport/TransportView.vue') },
        { path: '/history', name: 'history', component: () => import('../domains/history/HistoryView.vue') },
        { path: '/notifications', name: 'notifications', component: () => import('../domains/notifications/NotificationsView.vue') },
        { path: '/support', name: 'support', component: TechnicalSupportView },
        { path: '/prueba', name: 'prueba', component: PruebaView }
    ]
})

router.beforeEach((to) => {
    // Rutas que requieren autenticación
    const protectedRoutes = [
        'home', 'documents', 'payments', 'transport',
        'history', 'notifications', 'support'
    ]
    
    if (!protectedRoutes.includes(to.name)) return true
    
    try {
        if (!JSON.parse(localStorage.getItem('kapakid:user')||'null')) {
            return { name: 'login' }
        }
    } catch {
        return { name: 'login' }
    }
    return true
})

export default router
