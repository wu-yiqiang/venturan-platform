export const useBlockFocus = (data: any[], callback: Function) => {
    const selectedIndex = ref(-1)
  const lastSelectBlock = computed(() => {
    return data.value?.blocks[selectedIndex.value]
  })
  const clearBlocksFocus = () => {
    data.value?.blocks?.forEach((block: any) => {
      block.focus = false
    })
  }
  const blockMousedown = (e: Event, block: any, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (e?.shiftKey) {
      if (focusData.value.focus?.length <= 1) {
        block.focus = true
      } else {
        block.focus = !block.focus
      }
    } else {
      if (!block?.focus) {
        clearBlocksFocus()
        block.focus = true
      }
    }
    selectedIndex.value = index
    callback(e)
  }
  const focusData = computed(() => {
    let focus = []
    let unFocus = []
    data.value?.blocks.forEach((block: any) => {
      ;(block?.focus ? focus : unFocus).push(block)
    })
    return {
      focus,
      unFocus
    }
  })
  const containerMouseDown = () => {
        selectedIndex.value = -1
    clearBlocksFocus()
  }
  return {
    blockMousedown,
    containerMouseDown,
    focusData,
    lastSelectBlock
  }
}
