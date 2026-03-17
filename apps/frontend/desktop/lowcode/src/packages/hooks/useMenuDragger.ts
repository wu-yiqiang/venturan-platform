import { events } from "../../utils/event"

export const useMenuDragger = (containerRef: Ref, data: Ref) => {
  const currentComponent = ref(null)
  const dragenter = (e: { dataTransfer: { dropEffect: string } }) => {
    e.dataTransfer.dropEffect = 'move'
  }
  const dragover = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }
  const dragleave = () => {
    // e.dataTransfer.dropEffect = 'none'
  }
  const dragend = () => {
    containerRef.value.removeEventListener('dragenter', dragenter)
    containerRef.value.removeEventListener('dragover', dragover)
    containerRef.value.removeEventListener('dragleave', dragleave)
    containerRef.value.removeEventListener('drop', drop)
    events.emit('end')
  }
  const drop = (e: { offsetY: any; offsetX: any }) => {
    let blocks = data?.value.blocks
    data.value = {
      ...data?.value,
      blocks: [
        ...blocks,
        {
          top: e.offsetY,
          left: e.offsetX,
          zIndex: 1,
          alignCenter: true,
          key: currentComponent.value?.key
        }
      ]
    }
    currentComponent.value = null
  }
  const dragstart = (_e: Event, component: null) => {
    containerRef.value.addEventListener('dragenter', dragenter)
    containerRef.value.addEventListener('dragover', dragover)
    containerRef.value.addEventListener('dragleave', dragleave)
    containerRef.value.addEventListener('drop', drop)
    currentComponent.value = component
    events.emit('start')
  }
  return {
    dragstart,
    dragend
  }
}