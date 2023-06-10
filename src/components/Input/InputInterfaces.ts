import { ChangeEventHandler } from "react"
import { Type } from "./InputTypes"

export interface InputProperties {
  id?: string,
  type: Type
  value?: string | number | boolean,
  min?: number,
  max?: number,
  step?: number,
  checked?: boolean,
  disabled?: boolean,
  onChange?: ChangeEventHandler<HTMLInputElement>
}
