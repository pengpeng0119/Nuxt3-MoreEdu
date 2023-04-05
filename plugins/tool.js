export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("commonOpen", (item) => {
        if (item.type == 'webview') {
            window.open(item.url)//单页面应用内
        } else if (item.type == 'course') {
            navigateTo(`/detail/course/${item.course_id}`)//单页面应用外
        }
    })
})