import { http } from '@/utils/http'


// 获取字典
export function getDictionaryItemByType(type: string) {
    return http.post<any>('/mapping/types', { mappingType: type })
}