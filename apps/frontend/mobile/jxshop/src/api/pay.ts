import { http } from '@/utils/http'


// 获取门店列表
export function payPay(data: any) {
    return http.post<any>('/order/create', data)
}

export function getOrders() {
    return http.post<any>('/order/list')
}