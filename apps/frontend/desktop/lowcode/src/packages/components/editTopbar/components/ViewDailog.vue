<template>
  <el-dialog v-model="open" title="效果预览" :width="dialogBodyWidth" :before-close="handleClose">
    <div class="editor-container">
      <div class="editor-container-canvas_content" :style=containerStyles>
        <EditorBlock v-for="(block, index) in editorDatas?.blocks" :block="block" :key="index" />
      </div>
    </div>
    <template #footer>
      <el-button @click="handleClose">Close</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import EditorBlock from '../../../editor-block'

const emit = defineEmits(['update:visible']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  jsonDatas: {
    type: String,
    default: ''
  }
})
const open = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})
const editorDatas = computed(() => {
  return props.jsonDatas
})
const containerStyles = computed({
  get() {
    return {
      width: editorDatas.value?.container?.width + 'px',
      height: editorDatas.value?.container?.height + 'px'
    }
  },
  set() { }
})
const dialogBodyWidth = computed(() => {
  return (editorDatas.value?.container?.width + 40) + 'px'
})
const handleClose = () => {
  open.value = false
}

</script>

<style lang="scss" scoped>
.el-dialog__body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  place-items: center;
  .editor-container {
    padding: 0;
    border-radius: 4px;
    border:1px solid rgb(226, 225, 225);
    .editor-container-canvas_content {
      position: relative;
    }
  }

}
</style>