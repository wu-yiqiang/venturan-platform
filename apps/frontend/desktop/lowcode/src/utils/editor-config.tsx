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
  value: '',
  label: '文本',
  icon: () => (
    <el-icon>
      <Tickets />
    </el-icon>
  ),
  preview: () => '预览文本',
  render: () => '渲染文本',
  key: ComponentTypeEnum.TEXT,
  attributes: {
    text: '文本'
  }
})

registerConfig.register({
  value: '',
  label: '按钮',
  icon: () => (
    <el-icon>
      <Tickets />
    </el-icon>
  ),
  preview: () => <ElButton>预览按钮</ElButton>,
  render: () => <ElButton>渲染按钮</ElButton>,
  key: ComponentTypeEnum.BUTTON,
  attributes: {
    text: '按钮'
  }
})

registerConfig.register({
  value: '',
  label: '输入框',
  icon: () => (
    <el-icon>
      <Tickets />
    </el-icon>
  ),
  preview: () => <ElInput placeholder="预览输入框" />,
  render: (props: any) => <ElInput {...props} style={{ width: props?.width + 'px', height: props?.height + 'px' }} v-model={props.value} />,
  key: ComponentTypeEnum.INPUT,
  attributes: {
    text: '输入框',
    value: '',
    placeholder: '请输入',
    width: 240,
    height: 32
  }
})

registerConfig.register({
  value: '',
  label: '选择器',
  icon: () => (
    <el-icon size="20">
      <Tickets />
    </el-icon>
  ),
  preview: () => <ElSelect placeholder="预览选择器" style="width: 240px" />,
  render: (props: any) => (
    <ElSelect
      {...props}
      v-model={props.value}
      style={{ width: props?.width + 'px', height: props?.height + 'px' }}
      options={[
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ]}
    ></ElSelect>
  ),
  key: ComponentTypeEnum.SELECT,
  attributes: {
    text: '选择器',
    value: 'Option1',
    placeholder: '请选择',
    width: 240,
    height: 32
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
    attributes: {}
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
    attributes: {}
  },
  {
    label: '输入框',
    icon: () => (
      <el-icon size="20">
        <Tickets />
      </el-icon>
    ),
    preview: () => <ElInput placeholder="预览输入框" />,
    render: (props: any) => <ElInput {...props} style={{ width: props?.width + 'px', height: props?.height + 'px' }} v-model={props.value} />,
    key: ComponentTypeEnum.INPUT,
    attributes: {
      value: '11'
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
    attributes: {}
  }
]