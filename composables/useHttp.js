// 公共配置
const fetchConfig = {
    baseURL: 'http://demonuxtapi.dishait.cn/pc',
    headers: {
        appid: 'bd9d01ecc75dbbaaefce'
    }
}
function useGetFetchOptions(options = {}) {
    options.baseURL = options.baseURL ?? fetchConfig.baseURL
    options.headers = options.headers ?? {
        appid: fetchConfig.headers.appid
    }
    options.initialCache = options.initialCache ?? false
    options.lazy = options.lazy ?? false
    // 
    return options
}
// 
export async function useHttp(key, url, options = {}) {
    options = useGetFetchOptions(options)
    options.key = key
    let res = await useFetch(url, {
        ...options,
        // 相当于响应拦截器
        transform: (res) => {
            return res.data
        }
    })
    return res
}
// GET
export function useHttpGet(key, url, options = {}) {
    options.method = 'GET'
    return useHttp(key, url, options)
}
// POST
export function useHttpPost(key, url, options = {}) {
    options.method = 'POST'
    return useHttp(key, url, options)
}