import { ElButton, ElInput, ElSelect } from 'element-plus'
import { Tickets } from '@element-plus/icons-vue/global'
import type { ComponentType } from './type'
import  { ComponentTypeEnum } from '../common/const'

type componentMapType = {
  [K in ComponentTypeEnum]?: ComponentType
}

const createEditorConfig = () => {
  let componentsList: any[] = []
  let componentMap: componentMapType = {}
  return {
    componentsList,
    componentMap,
    register: (component: ComponentType) => {
      componentsList.push(component)
      componentMap[component.key] = component
    }
  }
}

export let registerConfig = createEditorConfig()
registerConfig.register({
  label: '文本',
  icon: () => (
    <el-icon>
      <Tickets />
    </el-icon>
  ),
  preview: () => '预览文本',
  render: () => '渲染文本',
  key: ComponentTypeEnum.TEXT,
  props: {
    text: '文本'
  }
})

registerConfig.register({
  label: '按钮',
  icon: () => (
    <el-icon>
      <Tickets />
    </el-icon>
  ),
  preview: () => <ElButton>预览按钮</ElButton>,
  render: () => <ElButton>渲染按钮</ElButton>,
  key: ComponentTypeEnum.BUTTON,
  props: {
    text: '按钮'
  }
})

registerConfig.register({
  label: '输入框',
  icon: () => (
    <el-icon>
      <Tickets />
    </el-icon>
  ),
  preview: () => <ElInput placeholder="预览输入框" />,
  render: () => <ElInput placeholder="渲染输入框" />,
  key: ComponentTypeEnum.INPUT,
  props: {
    text: '输入框'
  }
})

registerConfig.register({
  label: '选择器',
  icon: () => (
    <el-icon size="20">
      <Tickets />
    </el-icon>
  ),
  preview: () => <ElSelect placeholder="预览选择器" style="width: 240px" />,
  render: () => (
    <ElSelect
      placeholder="渲染选择器"
      style="width: 240px"
      options={[
        { id: 1, label: 'Option A', desc: 'Option A - 230506' },
        { id: 2, label: 'Option B', desc: 'Option B - 230506' },
        { id: 3, label: 'Option C', desc: 'Option C - 230506' },
        { id: 4, label: 'Option A', desc: 'Option A - 230507' }
      ]}
    ></ElSelect>
  ),
  key: ComponentTypeEnum.SELECT,
  props: {
    text: '选择器'
  }
})


export const basicComponents = [
  {
    label: '文本',
    icon: () => (
      <el-icon size="20">
        <Tickets />
      </el-icon>
    ),
    preview: () => '预览文本',
    render: () => '渲染文本',
    key: ComponentTypeEnum.TEXT,
    props: {
    }
  },
  {
    label: '按钮',
    icon: () => (
      <el-icon size="20">
        <Tickets />
      </el-icon>
    ),
    preview: () => <ElButton>预览按钮</ElButton>,
    render: () => <ElButton>渲染按钮</ElButton>,
    key: ComponentTypeEnum.BUTTON,
    props: {
    }
  },
  {
    label: '输入框',
    icon: () => (
      <el-icon size="20">
        <Tickets />
      </el-icon>
    ),
    preview: () => <ElInput placeholder="预览输入框" />,
    render: () => <ElInput placeholder="渲染输入框" />,
    key: ComponentTypeEnum.INPUT,
    props: {
    }
  },
  {
    label: '选择器',
    icon: () => (
      <el-icon size="20">
        <Tickets />
      </el-icon>
    ),
    preview: () => <ElSelect placeholder="预览选择器" />,
    render: () => <ElSelect placeholder="渲染选择器" />,
    key: ComponentTypeEnum.SELECT,
    props: {
    }
  }
]