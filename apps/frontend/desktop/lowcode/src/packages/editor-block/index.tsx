import { computed, defineComponent, inject } from 'vue'
import './editor-block.scss'
export default defineComponent({
  props: {
    block: {
      type: Object
    }
  },
  setup(props: any) {
    const blockStyles = computed({
      get() {
        return {
          top: props?.block.top + 'px',
          left: props?.block.left+ 'px',
          zIndex: props?.block.zIndex,
          value: props?.block.value,
        }
      },
      set() {}
    })
    const config = inject('config')
    const blockRef = ref(null)
    onMounted(() => {
      const { offsetWidth, offsetHeight } = blockRef.value
      if (props?.block?.alignCenter) {
        props.block.left = (props?.block.left - offsetWidth / 2)
        props.block.top = (props?.block.top - offsetHeight / 2)
        props.block.alignCenter = false
      }
      props.block.width = offsetWidth
      props.block.height = offsetHeight
      props.block.value = ''
    })
    const llll = ref('1212')
    return () => {
      const component = config.componentMap[props?.block.key]
      const RenderComponent = component.render()
      return (
        <div ref={blockRef} class="editor-block" style={blockStyles.value}>
          <RenderComponent value={llll.value} />
        </div>
      )
    }
  }
})