import { ComponentTypeEnum } from "../common/const"

export interface ComponentType {
  label: string
  icon: any
  preview: any
  render: any
  key: `${ComponentTypeEnum}`
  props: object
}