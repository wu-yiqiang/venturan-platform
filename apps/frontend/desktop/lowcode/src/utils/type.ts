import { ComponentTypeEnum } from "../common/const"

export interface ComponentType {
  value: any
  label: string
  icon: any
  preview: any
  render: any
  key: `${ComponentTypeEnum}`
  attributes: object
}