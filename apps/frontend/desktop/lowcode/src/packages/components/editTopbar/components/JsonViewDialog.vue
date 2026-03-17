<template>
  <el-dialog v-model="open" title="导出" fullscreen class="fullscreen" :before-close="handleClose">
    <vue-json-pretty :data="jsonDatas" :deep="3" :show-length="true" :show-line="true" :highlight-mouseover="true" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>

        <el-button type="primary" @click="handleCopy">
          Copy
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import message from 'element-plus/es/components/message/index.mjs';
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { copyToClip } from '../../../../utils';
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

const handleClose = () => {
  open.value = false
}
const handleCopy = () => {
  copyToClip(JSON.stringify(props?.jsonDatas));
  message({
    message: '复制成功',
    type: 'success'
  });
  handleClose()
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
  }
}
</style>