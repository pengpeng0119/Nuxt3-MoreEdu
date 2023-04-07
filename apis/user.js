export function userloginApi(body) {
    console.log(body)
    return useHttpPost("login", "/login", {
        body
    })
}
export function useGetinfoApi() {
    return useHttpGet("getinfo", "/getinfo", {
        $: true
    })
}
// 退出登录
export function useLogoutApi() {
    return useHttpPost('logout', "/logout")
}
// 注册
export function useRegApi(body) {
    console.log(body)
    return useHttpPost("reg", "/reg", {
        body
    })
}
// 绑定手机号
export function useBindPhoneApi(body) {
    return useHttpPost("bindphone", "/bind_mobile", {
        body
    })
}
// 获取耍手机验证码
export function useGetCaptchaApi(phone) {
    return useHttpPost("GetCaptcha", "/get_captcha", {
        body: {
            phone
        }
    })
}