import { computed, defineComponent, inject, ref } from 'vue'
import './index.scss'
export default defineComponent({
  props: {
    value: {
      type: Object
    },
    componentList: {
      type: Array
    }
  },
  setup(props: any) {
    const data = computed({
      get() {
        return props?.value
      },
      set() {
        // emit('update', value)
      }
    })
    const radio = ref('New York')
    const config = inject('config')
    const containerRef = ref()
    const dragstart = (event: Event, component: any) => {
      event.dataTransfer.dropEffect = 'move'
    }
    return () => <div class="editor-material" >
      <el-radio-group v-model="radio" size="large" >
        <el-radio-button label="New York" value="New York" />
        <el-radio-button label="Washington" value="Washington" />
        <el-radio-button label="Los Angeles" value="Los Angeles" />
        <el-radio-button label="Chicago" value="Chicago" />
        </el-radio-group>
      {
      config?.componentsList?.map(component => {
        return (
          <div class="component-item" draggable onDragstart={(e) => dragstart(e, component)}>
            <span>{component.label}</span>
            <span>{component.preview()}</span>
          </div>
        )
    }) }</div>
  }
})

