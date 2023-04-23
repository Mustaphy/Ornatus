export interface Background {
  color: Color,
  linearGradient: LinearGradient
}

export interface Color {
  color: string
}

export interface LinearGradient {
  colors: string[]
}