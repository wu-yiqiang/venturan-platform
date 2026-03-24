export const useSysStore = defineStore('JXSHOPSTORE', () => {
  const userInfos = ref<any>({
  })
  const bottomTab = ref(false)
  const ShopStatus = ref([])
  const setUserInfos = (value: any) => {
    userInfos.value = value
  }
  const setShopStatus = (value: any) => {
    ShopStatus.value = value
  }
  const setBottomTab = (value: boolean) => {
    bottomTab.value = value
  }
  return {
    setUserInfos,
    userInfos,
    ShopStatus,
    setShopStatus,
    bottomTab,
    setBottomTab
  }
}, {
  persist: true
})
