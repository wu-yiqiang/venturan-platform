import { http } from '@/utils/http'


// 用户登录
export function userLogin() {
    return http.post<any>('/user/login')
}