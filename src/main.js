import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//importamos lo que usaremos de prime vue
import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material';
import 'primeicons/primeicons.css';
import {Button, Card, InputText, SelectButton} from "primevue";

//importo el i18n para la internacionalización
import i18n from "./i18n.js";

createApp(App)
    .use(i18n)
    .use(PrimeVue, {ripple:true, theme:{preset:Material}})

    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-inputText', InputText)
    .component('pv-select-button', SelectButton)
    .mount('#app')
