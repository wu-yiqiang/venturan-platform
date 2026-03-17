export const useSysStore = defineStore('JXSHOPSTORE', () => {
  const userInfos = ref({
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
