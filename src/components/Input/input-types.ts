import { ChangeEventHandler } from "react"

export interface InputProperties {
  id?: string,
  type: InputType
  value: string | number,
  min?: number,
  max?: number,
  step?: number,
  onChange: ChangeEventHandler<HTMLInputElement>
}

export enum InputType {
  Button = 'button',
  Color = 'color',
  Date = 'date',
  DatetimeLocal = 'datetime-local',
  Email = 'email',
  Month = 'month',
  Number = 'number',
  Password = 'password',
  Reset = 'reset',
  Search = 'search',
  Submit = 'submit',
  Tel = 'tel',
  Text = 'text',
  Time = 'time',
  Url = 'url',
  Week = 'week'
}