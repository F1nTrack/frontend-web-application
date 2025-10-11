import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    // Use a relative base so assets and dynamic chunks load correctly
    // when the app is hosted under a root or a subpath (Vercel, GitHub Pages, etc.).
    // This avoids absolute '/' asset URLs that can break when the site
    // is served from a non-root path.
    base: './',
    plugins: [vue()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                rewrite: p => p.replace(/^\/api/, ''),
            },
        },
    },
})
