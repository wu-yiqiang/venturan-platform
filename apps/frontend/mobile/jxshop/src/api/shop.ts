import { http } from '@/utils/http'


// 获取门店列表
export function getShops() {
  return http.post<any>('/shop/list')
}

// 获取门店列表
export function getShopDetails(shopId: number) {
  return http.get<any>(`/details/${shopId}`)
}

// 获取门店商品列表
export function getShopDetail(shopId: number) {
    return http.get<any>(`/shop/details/${shopId}`)
}

export function getShopCommodities(shopId: number) {
  return http.post<any>(`/commodity/list`, {shopId})
}