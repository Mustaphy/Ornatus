export interface Value {
  button: string,
  color: string,
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
  unit: string
}

export interface Width {
  value: number,
  unit: string
}

export interface Background {
  selected: BackgroundOptions,
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
  style: BorderOptions,
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

export enum ElementOptions {
  A = 'a',
  Abbr = 'abbr',
  Address = 'address',
  Article = 'article',
  Aside= 'aside',
  B = 'b',
  Bdi = 'bdi',
  Bdo = 'bdo',
  Blockquote = 'blockquote',
  Button = 'button',
  Cite = 'cite',
  Code = 'code',
  Div = 'div',
  Em = 'em',
  Footer = 'footer',
  Form = 'form',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4', 
  H5 = 'h5',
  H6 = 'h6',
  I = 'i',
  Input = 'input',
  Ins = 'ins',
  Kbd = 'kbd',
  Label = 'label',
  Main = 'main',
  Mark = 'mark',
  Nav = 'nav',
  Output = 'output',
  P = 'p',
  Pre = 'pre',
  Q = 'q',
  S = 's',
  Samp = 'samp',
  Section = 'section',
  Small = 'small',
  Span = 'span',
  Strong = 'strong',
  Sub = 'sub',
  Sup = 'sup',
  Textarea = 'textarea',
  Time = 'time',
  U = 'u',
  Var = 'var'
}

export enum BackgroundOptions {
  Color = 'color',
  LinearGradient = 'linear-gradient'
}

export enum BorderOptions {
  Solid = 'solid',
  Dashed = 'dashed',
  Dotted = 'dotted',
  Double = 'double',
  Groove = 'groove',
  Ridge = 'ridge',
  Inset = 'inset',
  Outset = 'outset'
}

export enum CursorOptions {
  Pointer = 'pointer',
  Default = 'default',
  None = 'none',
  ContextMenu = 'context-menu',
  Help = 'help',
  Progress = 'progress',
  Wait = 'wait',
  Cell = 'cell',
  Crosshair = 'crosshair',
  Text = 'text',
  VerticalText = 'vertical-text',
  Alias = 'alias',
  Copy = 'copy',
  Move = 'move',
  NoDrop = 'no-drop',
  NotAllowed = 'not-allowed',
  Grab = 'grab',
  Grabbing = 'grabbing',
  AllScroll = 'all-scroll',
  ColResize = 'col-resize',
  RowResize = 'row-resize',
  NResize = 'n-resize',
  EResize = 'e-resize',
  SResize = 's-resize',
  WResize = 'w-resize',
  NeResize = 'ne-resize',
  NwResize = 'nw-resize',
  SeResize = 'se-resize',
  SwResize = 'sw-resize',
  EwResize = 'ew-resize',
  NsResize = 'ns-resize',
  NeswResize = 'nesw-resize',
  NwseResize = 'nwse-resize',
  ZoomIn = 'zoom-in',
  ZoomOut = 'zoom-out'
}
