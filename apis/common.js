export function useSearchListApi(query) {
    return useHttpGet("searchList", () => {
        let q = useQueryToString(query())
        return `/search${q}`
    }, {
        lazy: true
    })
}


// 获取可用优惠卷列表
export function useCouponListApi() {
    return useHttpGet('CouponList', "/coupon/list")
}

// 领取优惠券
export function useReceiveUserCouponApi(body) {
    return useHttpPost("receiveUserCoupon", "/user_coupon/receive", {
        body
    })
}


// 通用列表
export function useListApi(type, query = {}) {
    let q = useQueryToString(query)
    return useHttpGet(type + "List", `/${type}/list${q}`, {
        lazy: true
    })
}

// 查看课程/专栏详情
export function useReadDetailApi(type, query = {}) {
    let q = useQueryToString(query)
    return useHttpGet("readDetail", `/${type}/read${q}`, {
        lazy: true
    })
}
