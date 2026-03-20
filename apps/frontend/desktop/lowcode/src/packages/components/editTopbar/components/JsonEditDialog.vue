<template>
  <el-dialog v-model="open" title="导入" fullscreen class="fullscreen" :before-close="handleClose">
    <vue-json-pretty v-model:data="jsonDatas"
 :deep="3" :show-length="true" :show-line="true" :editable="true"
      :highlight-mouseover="true" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
                <el-button @click="handlePaste">
          Paste
        </el-button>
        <el-button type="primary" @click="handleSave">
          Save
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import message from 'element-plus/es/components/message/index.mjs';
const emit = defineEmits(['update:visible', 'ok']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
})
const open = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})
const jsonDatas = ref({})
const handleClose = () => {
  open.value = false
}
const handleOk = (data: any) => {
  emit('ok', data)
  handleClose()
}

const handlePaste = async () => {
  const data = await navigator.clipboard?.readText()
  console.log("sss", navigator.clipboard?.readText())
  if (data?.length) {
    jsonDatas.value = JSON.parse(data)
    message({
    message: '粘贴成功',
    type: 'success'
  });
  } else {
    jsonDatas.value = {}
      message({
    message: '粘贴失败',
    type: 'error'
  });
}
   
}
const handleSave = () => {
  message({
    message: '导入成功',
    type: 'success'
  });
  handleOk(jsonDatas.value)
}
</script>
<style lang="scss">
.fullscreen {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  .el-dialog__body {
    flex: 1;
    overflow-y: auto;
    .inputJson {
      border: none;
    }
    // .vjs-tree {
    //   height: 100%;
    //   .vjs-tree-list {
    //     height: 100%;
    //   }
    // }
  }
}
</style>