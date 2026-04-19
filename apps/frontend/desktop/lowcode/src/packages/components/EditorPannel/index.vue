<template>
  <section class="EditorPannel">
    <ButtonTab :tabs="tabs">
      <template #form>
        <el-form :model="form" label-position="left" label-width="80">
          <el-form-item label="表单名">
            <el-input v-model="form.formName" style="width: 240px" placeholder="请输入表单名" />
          </el-form-item>
          <el-form-item label="表单宽度">
            <el-input-number v-model="form.width" style="width: 240px" :step="10" />
          </el-form-item>
          <el-form-item label="表单高度">
            <el-input-number v-model="form.height" style="width: 240px" :step="10" />
          </el-form-item>
        </el-form>
      </template>
      <template v-if="block" #common>
        <el-form :model="block" label-position="left" label-width="80">
          <el-form-item v-if="!([ComponentTypeEnum.BUTTON, ComponentTypeEnum.TEXT].includes(block.key))" label="组件值">
            <el-input v-model="block.attributes.value" />
          </el-form-item>
          <el-form-item v-if="([ComponentTypeEnum.BUTTON, ComponentTypeEnum.TEXT].includes(block.key))" label="标签">
            <el-input v-model="block.attributes.label" />
          </el-form-item>
          <el-form-item v-if="!([ComponentTypeEnum.BUTTON, ComponentTypeEnum.TEXT].includes(block.key))" label="禁用">
            <el-switch v-model="block.attributes.disabled" />
          </el-form-item>
          <el-form-item v-if="block.attributes?.placeholder?.length" label="占位符">
            <el-input v-model="block.attributes.placeholder" style="width: 240px" placeholder="请输入占位符" />
          </el-form-item>
          <el-form-item v-if="block.attributes?.width" label="组件宽度">
            <el-input-number v-model="block.attributes.width" style="width: 240px" :step="10" />
          </el-form-item>
          <el-form-item v-if="block.attributes?.height" label="组件高度">
            <el-input-number v-model="block.attributes.height" style="width: 240px" :step="10" />
          </el-form-item>
        </el-form>
      </template>

      <template v-if="block" #private>
        <el-form :model="block" label-position="top">
          <el-form-item v-if="([ComponentTypeEnum.SELECT].includes(block.key))" label="选项值">
            <el-row>
              <el-col v-for="(item, index) in block?.attributes?.options" :span="24" :key="index">
                <el-row :gutter="6" style="margin-bottom: 8px;">
                  <el-col :span="22">
                    <el-input v-model="item.label" :key="index" @change="(value: string) => item.value = value" />
                  </el-col>
                  <el-col :span="2">
                    <el-button :icon="Delete" size="small" circle @click="handleDelete(index)" />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-button v-if="block?.attributes?.options?.every((item: any) => item.value)" text @click="handleAdd">
              添加
            </el-button>
          </el-form-item>
        </el-form>
      </template>
    </ButtonTab>
  </section>
</template>
<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import ButtonTab from '@/components/ButtonTab/index.vue'
import { ComponentTypeEnum } from '../../../common/const'
const props = defineProps({
  block: {
    type: Object,
    default: () => { }
  },
  form: {
    type: Object,
    default: () => { }
  }
})
const tabs = [
  { label: '表单属性', value: 'form' },
  { label: '通用属性', value: 'common' },
  { label: '私有属性', value: 'private' }
]
watchEffect(() => {
  console.log("block", props.block)
})
const handleDelete = (index: number) => {
  props.block.attributes.options = props.block?.attributes?.options?.filter((_, ind: number) => ind !== index)
}
const handleAdd = () => {
  props.block.attributes.options.push({ label: '', value: '' })
}
</script>
<style lang="scss" scoped>
.EditorPannel {
  width: 300px;
  background-color: #fff;
  border-radius: 4px;
  padding: 14px;
}
</style>
