import { ChangeEventHandler } from "react"
import { InputType } from "./InputTypes"

export interface InputProperties {
  id?: string,
  type: InputType
  value: string | number,
  min?: number,
  max?: number,
  step?: number,
  onChange: ChangeEventHandler<HTMLInputElement>
}
