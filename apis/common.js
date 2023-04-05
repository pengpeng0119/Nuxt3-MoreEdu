export function useSearchListApi(query) {
    return useHttpGet("searchList", () => {
        let q = useQueryToString(query)
        return `/search${q}`
    }, {
        lazy: true
    })
}