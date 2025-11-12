import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                // 👇 AQUÍ ESTÁ EL CAMBIO
                // Apunta a tu nueva API pública en Render
                target: 'https://kapak-fake-api.onrender.com',

                changeOrigin: true, // ¡Muy importante para que funcione!

                // Esto elimina el '/api' antes de enviar la petición a Render
                // (Ej: /api/usuarios -> /usuarios)
                rewrite: p => p.replace(/^\/api/, ''),
            },
        },
    },
})


/*import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                rewrite: p => p.replace(/^\/api/, ''),
            },
        },
    },
})*/
