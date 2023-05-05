import { ChangeEventHandler } from "react"

export interface InputProperties {
  id?: string,
  type: InputType
  value: string | number,
  onChange: ChangeEventHandler<HTMLInputElement>
}

export enum InputType {
  Text = 'text',
  Color = 'color',
  Number = 'number'
}