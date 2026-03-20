<template>
  <section class="editor-top">
    <div class="left-actions">
      <div class="back-box" @click="handleBack">
        <el-button link>
          <el-icon>
            <Back color="#409EFF" />
          </el-icon>
        </el-button>
        返回
      </div>
      <!-- <div class="fileName">
        <el-input v-if="editable" v-model="fileName" /> <span v-else>{{ fileName }}</span>
      </div>
      <el-button v-if="!editable" link @click="editable = !editable">
        <el-icon :size="20">
          <Edit />
        </el-icon>
      </el-button>
      <el-button v-else link @click="editable = !editable">
        <el-icon :size="20">
          <Select />
        </el-icon>
      </el-button> -->
    </div>
    <div class="middle-actions">
      <el-space>
        <el-tooltip effect="light" content="导入" placement="bottom">
          <el-button :icon="EditPen" circle @click="handleOpeartion('import')" />
        </el-tooltip>
        <el-tooltip effect="light" content="导出" placement="bottom">
          <el-button :icon="Download" circle  @click="handleOpeartion('export')" />
        </el-tooltip>
        <!-- <el-tooltip effect="light" content="复制" placement="bottom">
          <el-button :icon="CopyDocument" circle @click="handleOpeartion('copy')" />
        </el-tooltip> -->
        <el-tooltip effect="light" content="撤销" placement="bottom">
          <el-button :icon="Back" circle @click="handleOpeartion('withdraw')" />
        </el-tooltip>
        <el-tooltip effect="light" content="刷新" placement="bottom">
          <el-button :icon="RefreshLeft" circle @click="handleOpeartion('flush')" />
        </el-tooltip>
        <el-tooltip effect="light" content="查看" placement="bottom">
          <el-button :icon="View" circle @click="handleOpeartion('view')" />
        </el-tooltip>
      </el-space>
    </div>
    <div class="right-actions">
      <el-button type="primary">保存</el-button>
      <el-button type="primary">发布</el-button>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { Back, Edit, RefreshLeft, EditPen, View, Select, Download } from '@element-plus/icons-vue';
import { ref } from 'vue';
const emit = defineEmits(['copy', 'withdraw', 'flush', 'view', 'export', 'import'])
const editable = ref(false)
const fileName = ref('demo1')
const handleBack = () => { }
const handleOpeartion = (operation: string) => {
  emit(operation)
}
</script>
<style lang="scss" scoped>
.editor-top {
  padding: 12px 20px;
  background-color: #fff;
  border-bottom: 1px solid rgb(220, 220, 220);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-actions {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    column-gap: 20px;
    width: 500px;

    .back-box {
      color: #409EFF;
      cursor: pointer;
    }

    .fileName {
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .right-actions {
    display: flex;
    width: 500px;
    justify-content: flex-end;
    align-content: center;
  }
}
</style>
