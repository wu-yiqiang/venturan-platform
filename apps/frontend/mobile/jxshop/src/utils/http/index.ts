import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Axios from 'axios'
import { showFailToast } from 'vant'
import { ContentTypeEnum, ResultEnum } from '@/enums/request-enum'
import NProgress from '../progress'
import 'vant/es/toast/style'
import { useSysStore } from '@/store/modules/sysStore'
const configDefault: AxiosRequestConfig = {
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
  },
  timeout: 60 * 60 * 3,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  data: {},
}

// HTTP 状态码 → 错误消息映射
const HTTP_ERROR_MAP: Record<number, string> = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
}

const axiosInstance: AxiosInstance = Axios.create(configDefault)

// 请求拦截
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    NProgress.start()
    const sysStore = useSysStore()
    const token = sysStore.userInfos?.token
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error: AxiosError) => {
    showFailToast(error.message)
    return Promise.reject(error)
  },
)

// 响应拦截
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done()
    const status = response?.status
    const { data, code, msg } = response.data
    if (status == 200) {
      if (code == 200) return data
      showFailToast(msg)
      return Promise.reject(response.data)
    }
    else {
      return Promise.reject(response.data)
    }
  },
  (error: AxiosError) => {
    NProgress.done()
    if (Axios.isCancel(error)) {
      return Promise.reject(error)
    }
    // 处理 HTTP 网络错误
    const status = error.response?.status
    const message = (status && HTTP_ERROR_MAP[status]) || '网络连接故障'
    showFailToast(message)
    return Promise.reject(error)
  },
)

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.get(url, config)
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.post(url, data, config)
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.put(url, data, config)
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.delete(url, config)
  },
  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return axiosInstance.request(config)
  },
  /**
   * 可取消的请求 — 适用于页面切换时取消未完成的请求
   * @example
   * const { promise, cancel } = http.requestWithCancel({ url: '/api/data' })
   * onBeforeUnmount(() => cancel())
   * const data = await promise
   */
  requestWithCancel<T = any>(config: AxiosRequestConfig) {
    const controller = new AbortController()
    const finalConfig = {
      ...config,
      signal: controller.signal,
    }
    return {
      promise: axiosInstance.request<any, T>(finalConfig),
      cancel: () => controller.abort(),
    }
  },
}
