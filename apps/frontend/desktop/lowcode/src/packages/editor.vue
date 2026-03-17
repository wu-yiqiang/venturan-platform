<template>
  <EditorTop @withdraw="handleWithDraw" @export="handleExport" @import="handleImport" @view="handleView"/>
  <div class="editor">
    <EditMaterial :componentList="config?.componentList" v-model="data" />
    <div class="editor-container">
      <div class="editor-container-canvas">
        <div class="editor-container-canvas_content" :style=containerStyles @mousedown="containerMouseDown">
          <EditorBlock v-for="(block, index) in data?.blocks" :block="block" :key="index"
            :class="block?.focus ? 'editor-block-focus' : ''"
            @mousedown="(e: Event) => blockMousedown(e, block, index)" />
          <div v-if="markLine?.x" class="line-x" :style="{ left: markLine?.x + 'px' }"></div>
          <div v-if="markLine?.y" class="line-y" :style="{ top: markLine?.y + 'px' }"></div>
        </div>
      </div>
    </div>
    <EditAttrpannel />
  </div>
  <JsonViewDialog v-model:visible="exportVisible" :jsonDatas="jsonDatas" />
  <JsonEditDialog v-model:visible="importVisible" />
  <ViewDailog  v-model:visible="viewVisible" :jsonDatas="jsonDatas" />
</template>
<script lang="ts" setup>
import JsonViewDialog from './components/editTopbar/components/JsonViewDialog.vue';
import JsonEditDialog from './components/editTopbar/components/JsonEditDialog.vue';
import EditAttrpannel from './components/editAttrPannel/index.tsx'
import EditMaterial from './components/editMaterial/index.vue'
import EditorTop from './components/editTopbar/index.vue'
import EditorBlock from './editor-block'
import ViewDailog from './components/editTopbar/components/ViewDailog.vue';
import { useBlockFocus } from './hooks/useBlockFocus.ts'
const emit = defineEmits(['update:value'])
const props = defineProps({
  value: {
    type: Object
  }
})
const exportVisible = ref(false)
const importVisible = ref(false)
const viewVisible = ref(false)
const jsonDatas = ref('')
const data = computed({
  get() {
    return props?.value
  },
  set(value) {
    emit('update:value', value)
  }
})
const containerStyles = computed({
  get() {
    return {
      width: props?.value.container.width+'px',
      height: props?.value.container.height+'px'
    }
  },
  set() { }
})
const { blockMousedown, containerMouseDown, focusData, lastSelectBlock } = useBlockFocus(data, (e: Event) => { mousedown(e) })
const config = inject('config')
let dragState = {
  startX: 0,
  startY: 0,
  startPosition: []
}
let markLine = ref({
  x: null,
  y: null
})
const mousedown = (e: Event) => {
  const { width: BWidth, height: BHeight } = lastSelectBlock.value
  dragState = {
    startX: e?.clientX,
    startY: e?.clientY,
    startLeft: lastSelectBlock.value.left,
    startTop: lastSelectBlock.value.top,
    startPosition: focusData.value.focus?.map(({ top, left }) => ({ top, left })),
    lines: (() => {
      const { unFocus } = focusData.value
      let lines = { x: [], y: [] }
      unFocus.forEach((block) => {
        const { top: ATop, left: ALeft, width: AWidth, height: AHeight } = block
        lines.y.push({ showTop: ATop, top: ATop })
        lines.y.push({ showTop: ATop, top: ATop - BHeight })
        lines.y.push({ showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - BHeight / 2 })
        lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight })
        lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - BHeight })
        lines.x.push({ showLeft: ALeft, left: ALeft })
        lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth })
        lines.x.push({ showLeft: ALeft + AWidth / 2, left: ALeft + AWidth / 2 - BWidth })
        lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - BWidth })
        lines.x.push({ showLeft: ALeft, left: ALeft - BWidth })
      })
      return lines
    })()
  }
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)

}
const mouseup = (e: Event) => {
  document.removeEventListener('mousemove', mousemove)
  document.removeEventListener('mouseup', mouseup)
  markLine.value.x = null
  markLine.value.y= null

}
const mousemove = (e: Event) => {
  let { clientX: moveX, clientY: moveY } = e
  const left = moveX - dragState.startX + dragState.startLeft
  const top = moveY - dragState.startY + dragState.startTop
  let y = null
  let x = null
  for (let i = 0; i < dragState.lines.y.length; i++) {
    const { top: t, showTop: s } = dragState.lines.y[i];
    if (Math.abs(t - top) < 5) {
      y = s
      moveY = dragState.startY - dragState.startTop + t
      break
    }
  }
  for (let j = 0; j < dragState.lines.x.length; j++) {
    const { left: l, showLeft: s } = dragState.lines.x[j];
    if (Math.abs(l - left) < 5) {
      x = s
      moveX = dragState.startX - dragState.startLeft + l
      break
    }
  }
  markLine.value.x = x;
  markLine.value.y = y;
  let durX = moveX - dragState.startX
  let durY = moveY - dragState.startY
  focusData.value.focus?.forEach((block: any, index: number) => {
    block.top = dragState.startPosition[index].top + durY
    block.left = dragState.startPosition[index].left + durX
  })
}

const handleWithDraw = () => {
  
}
const handleView = () => {
  jsonDatas.value = data?.value ?? ''
  viewVisible.value = true
}

const handleExport = () => {
  jsonDatas.value = data?.value ?? ''
  exportVisible.value = true
}

const handleImport = () => {
  importVisible.value = true
}

</script>
<style lang="scss" scoped>
.editor {
  display: flex;
  justify-content: space-between;
  padding: 14px;
  flex: 1;
  overflow: hidden;

  &-container {
    height: 100%;
    width: inherit;
    box-sizing: border-box;
    overflow: hidden;
    &-canvas {
      overflow: auto;
      overflow-x: hidden;
      height: 100%;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &_content {
        background-color: #fff;
        position: relative;
        border-radius: 4px;
        padding: 14px;
        .editor-block {
          &::after {
            content: '';
            position: absolute;
            inset: 0;
            background-color: #ccc;
            opacity: 0.2;
          }
        }
        .editor-block-focus {
          &::after {
            border-radius: 2px;
            border: 2px dashed #409EFF;
          }
        }
        .line-x {
          position: absolute;
          top: 0;
          bottom: 0;
          border-left: 1px solid #409EFF;
        }
        .line-y {
          position: absolute;
          left: 0;
          right: 0;
          border-top: 1px solid #409EFF;
        }
      }

    }
  }
}
</style>
