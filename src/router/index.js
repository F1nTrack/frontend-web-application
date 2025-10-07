/*import { createRouter, createWebHistory } from 'vue-router'
import Argentina from "../viajes/components/Argentina.component.vue";
import Peru from "../viajes/components/Peru.component.vue"
import Ecuador from "../viajes/components/Ecuador.component.vue"
import NotFound from "../viajes/components/NotFound.component.vue";
import Ciudades from "../viajes/components/Ciudades.component.vue"
import Home from "../viajes/components/Home.component.vue"
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: Home},
        {path:'/peru', component:Peru,
            children:[
                {path:'ciudades', component:Ciudades},
            ]
        },
        {path:'/argentina', component:Argentina},
        {path:'/ecuador', component:Ecuador},
        {path:'/:pathMatch(.*)*', component:NotFound},

        //Here we can see the named views

        {path:'/login', name: 'login', components:{
                default:()=>import('../sales/components/Login.component.vue'),
                LeftSidebar:()=>import('../shared/components/LeftSidebar.vue'),
            }
        },

        {path:'/logout', name: 'logout', components:{
                default:()=>import('../sales/components/Logout.component.vue'),
                LeftSidebar:()=>import('../shared/components/LeftSidebar.vue'),
            }
        },

        {path:'/invoice', name: 'invoice', components:{
                default:()=>import('../sales/components/Invoice.component.vue'),
                LeftSidebar:()=>import('../shared/components/LeftSidebar.vue'),
            }
        }
    ]
})
export default router*/
