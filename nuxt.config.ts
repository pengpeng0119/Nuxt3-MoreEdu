export default defineNuxtConfig({
    modules: [
        'nuxt-windicss',
    ],
    build: {
        transpile: [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer'
        ]
    },
    vite: {
        optimizeDeps: {
            include: ['date-fns-tz/esm/formatInTimeZone']
        }
    }
})
