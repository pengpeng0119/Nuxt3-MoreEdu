import { createDiscreteApi } from "naive-ui"
export const useUser = () => {
    return useState("user", () => {
        return null
    })
}
// 更新用户信息
export async function useRefreshUserInfo() {
    const token = useCookie("token")
    const user = useUser()
    // 用户已登录，直接获取用户信息
    if (token.value) {
        let {
            data,
            error
        } = await useGetinfoApi()

        if (data.value) {

            user.value = data.value
        }
    }
}

// 退出登录

export async function useLogout() {
    await useLogoutApi()
    const user = useUser()
    user.value = null
    const token = useCookie("token")
    token.value = null
    const { message } = createDiscreteApi(['message'])
    message.success("退出登录成功")
    const route = useRoute()
    if (route.path != '/') {
        navigateTo('/', { replace: true })
    }
}