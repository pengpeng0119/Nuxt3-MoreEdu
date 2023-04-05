export function useIndexDataApi(options) {
    return useHttpGet(
        'indexData',
        '/index',
        {
            lazy: true
        }
    )
}
export function useGroupDataApi(query) {
    let q = useQueryToString(query)
    return useHttpGet(
        'groupdata',
        `/group/list${q}`
    )
}