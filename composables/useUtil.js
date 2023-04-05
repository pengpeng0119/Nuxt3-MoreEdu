// 将对象转url参数
export function useQueryToString(query = {}) {
    let q = ''
    for (const key in query) {
        if (q == '') {
            q = `?${key}=${query[key]}`
        } else {
            q += `&${key}=${query[key]}`
        }
    }
    return q
}