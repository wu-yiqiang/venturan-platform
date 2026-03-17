<template>
  <el-dialog v-model="open" title="效果预览" class="fullscreen" :before-close="handleClose">
    <div class="editor-container-canvas_content" :style=containerStyles>
      <EditorBlock v-for="(block, index) in editorDatas?.blocks" :block="block" :key="index" />
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
  console.log("ss", props.jsonDatas)
  return props.jsonDatas
})
const containerStyles = computed({
  get() {
    console.log("sdsd", props.jsonDatas)
    return {
      width: editorDatas.value?.container?.width + 'px',
      height: editorDatas.value?.container?.height + 'px'
    }
  },
  set() { }
})
const handleClose = () => {
  open.value = false
}

</script>

<style lang="scss">
.fullscreen {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  .el-dialog__body {
    flex: 1;
    overflow: auto;

    .editor-container-canvas_content {
      position: relative;
    }
  }
}
</style>