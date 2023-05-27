export interface Value {
  button: string,
  color: string,
  date: string,
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

export interface Background {
  selected: string,
  color: Color,
  linearGradient: LinearGradient
}

export interface Color {
  color: string
}

export interface LinearGradient {
  colors: string[]
}

export interface FontSize {
  value: number,
  unit: string
}

export interface Border {
  width: BorderWidth,
  style: string,
  color: string,
}

export interface BorderWidth {
  value: number,
  unit: string
}

export interface BorderRadius {
  value: number,
  unit: string
}

export interface Padding {
  value: number,
  unit: string
}
