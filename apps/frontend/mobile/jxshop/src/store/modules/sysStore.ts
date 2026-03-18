export const useSysStore = defineStore('JXSHOPSTORE', () => {
  const userInfos = ref<any>({
  })
  const setUserInfos = (value: any) => {
    userInfos.value = value
  }

  return {
    setUserInfos,
    userInfos
  }
}, {
  persist: true
})
