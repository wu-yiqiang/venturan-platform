import { computed, defineComponent } from 'vue'
import './index.scss'
export default defineComponent({
  props: {
    value: {
      type: Object
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
    return () => (
      <div class="editor-pannel">属性区域</div>
    )
  }
})