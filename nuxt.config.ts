export default defineNuxtConfig({
    app:{
        head:{
            titleTemplate:'%s-梦真编程',
            title:'梦真编程',
            charset:'utf-8',
            htmlAttrs:{
                lang:'zh-cn'
            },
            meta:[
                {name:'description',content:'梦真编程'},
                {name:'keywords',content:'梦真编程关键词'}
            ]
        }
    },
    css:[
        "~/assets/main.css"
    ],
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
    },
    imports:{
        dirs:["apis"]
    }
})
