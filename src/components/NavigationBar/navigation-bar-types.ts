export interface NavigationBarProperties {
  navigationLinks: NavigationLink[]
}

export interface NavigationLink {
  id: number,
  name: string,
  path: string
}
