import { Unit } from "../../components/UnitSelect/UnitSelectTypes"
import { BackgroundProperty, BorderStyle } from "./ElementDesignerTypes"

export interface Value {
  button: string,
  color: string,
  checkbox: string,
  date: string,
  datetimeLocal: string,
  email: string,
  month: string,
  number: string,
  password: string,
  reset: string,
  search: string,
  submit: string,
  tel: string,
  text: string,
  time: string,
  url: string,
  week: string,
}

export interface Height {
  value: number,
  unit: Unit
}

export interface Width {
  value: number,
  unit: Unit
}

export interface Background {
  selected: BackgroundProperty,
  color: BackgroundColor,
  linearGradient: BackgroundLinearGradient
}

export interface BackgroundColor {
  color: string
}

export interface BackgroundLinearGradient {
  colors: string[]
}

export interface FontSize {
  value: number,
  unit: Unit
}

export interface Border {
  width: BorderWidth,
  style: BorderStyle,
  color: string,
}

export interface BorderWidth {
  value: number,
  unit: Unit
}

export interface BorderRadius {
  value: number,
  unit: Unit
}

export interface Padding {
  value: number,
  unit: Unit
}
