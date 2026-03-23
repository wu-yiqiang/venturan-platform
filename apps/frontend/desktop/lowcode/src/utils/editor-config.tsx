import { ElButton, ElInput, ElSelect } from 'element-plus'
import { Tickets } from '@element-plus/icons-vue/global'
import  { ComponentTypeEnum } from '../common/const'

export const basicComponents = [
  {
    label: '文本',
    icon: () => (
      <el-icon size="20">
        <Tickets />
      </el-icon>
    ),
    render: (props: any) => <span style={{ width: props?.width + 'px', height: props?.height + 'px' }}>{props?.label}</span>,
    key: ComponentTypeEnum.TEXT,
    attributes: {
      label: '文本',
      width: 60,
      height: 32
    },
    privateProperties: {

    }
  },
  {
    label: '按钮',
    icon: () => (
      <el-icon size="20">
        <Tickets />
      </el-icon>
    ),
    render: (props: any) => <ElButton>{props?.label}</ElButton>,
    key: ComponentTypeEnum.BUTTON,
    attributes: {
      label: '按钮',
    },
    privateProperties: {

    }
  },
  {
    label: '输入框',
    icon: () => (
      <el-icon size="20">
        <Tickets />
      </el-icon>
    ),
    render: (props: any) => <ElInput {...props} style={{ width: props?.width + 'px', height: props?.height + 'px' }} v-model={props.value} disabled={props?.disabled} />,
    key: ComponentTypeEnum.INPUT,
    attributes: {
      text: '输入框',
      disabled: false,
      value: '',
      placeholder: '请输入',
      width: 200,
      height: 32
    }
  },
  {
    label: '选择器',
    icon: () => (
      <el-icon size="20">
        <Tickets />
      </el-icon>
    ),
    render: (props: any) => (
      <ElSelect
        placeholder="渲染选择器"
        {...props}
        style={{ width: props?.width + 'px', height: props?.height + 'px' }}
        v-model={props.value}
        disabled={props?.disabled}
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
      />
    ),
    key: ComponentTypeEnum.SELECT,
    attributes: {
      text: '选择器',
      disabled: false,
      value: '',
      placeholder: '请选择',
      width: 200,
      height: 32
    }
  }
]