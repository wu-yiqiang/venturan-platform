export const useSysStore = defineStore('JXSHOPSTORE', () => {
  const userInfos = ref<any>({
  })
  const ShopStatus = ref([])
  const setUserInfos = (value: any) => {
    userInfos.value = value
  }
  const setShopStatus = (value: any) => {
    ShopStatus.value = value
  }
  return {
    setUserInfos,
    userInfos,
    ShopStatus,
    setShopStatus,
  }
}, {
  persist: true
})
