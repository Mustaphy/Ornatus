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

export interface Fontsize {
  value: number,
  unit: string
}

export interface BorderRadius {
  value: number,
  unit: string
}