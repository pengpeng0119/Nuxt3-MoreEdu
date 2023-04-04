import {
    createDiscreteApi
} from 'naive-ui'
export default defineNuxtPlugin((nuxtApp) => {
    const bar = ref(null)
    nuxtApp.hook('app:mounted', (e) => {
        if (!bar.value) {
            const { loadingBar } = createDiscreteApi(['loadingBar'])
            bar.value = loadingBar
        }
    })
    nuxtApp.hook('page:start', (e) => {
        bar.value ? bar.value.start() : ''
    })
    nuxtApp.hook('page:finish', (e) => {
        setTimeout(() => {
            bar.value?.finish()
        }, 150)
    })
    nuxtApp.hook('app:err', (e) => {
        if (process.client) {
            setTimeout(() => {
                bar.value?.finish()
            }, 150)
        }
    })
})