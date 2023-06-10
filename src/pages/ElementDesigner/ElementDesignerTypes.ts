import { Unit } from "../../components/UnitSelect/UnitSelectTypes";

export const elementSelectors = [
  'a', 'abbr', 'address', 'article', 'aside', 'b', 'bdi', 'bdo', 'blockquote', 'button', 'cite', 'code', 'div', 'em',
  'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'input', 'ins', 'kbd', 'label', 'main', 'mark',  'nav',
  'output', 'p', 'pre', 'q', 's', 'samp', 'section', 'small', 'span', 'strong', 'sub', 'sup', 'textarea',  'time',  'u',
  'var'
] as const;
export type ElementSelector = typeof elementSelectors[number];

export const backgroundProperties = [
  'color', 'linear-gradient'
] as const;
export type BackgroundProperty = typeof backgroundProperties[number];

export const borderStyles = [
  'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'
] as const;
export type BorderStyle = typeof borderStyles[number];

export const cursorKeywords = [
  'pointer', 'default', 'none', 'context-menu', 'help', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text',
  'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize',
  'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize',
  'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out'
] as const;
export type CursorKeyword = typeof cursorKeywords[number];

export const options = [
  'element', 'type', 'innerText', 'value', 'height', 'width', 'background', 'color', 'fontSize', 'fontWeight',
  'border', 'borderRadius', 'padding', 'cursor'
] as const;
export type Option = typeof options[number];

export const globalKeywords = [
  'auto', 'inherit', 'initial', 'revert', 'revert-layer', 'unset'
] as const;
export type GlobalKeyword = typeof globalKeywords[number];

export type Value = {
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
} & Settings;

export type Height = {
  value: number,
  unit: Unit
} & Settings;

export type Width = {
  value: number,
  unit: Unit
} & Settings;

export type Background = {
  selected: BackgroundProperty,
  color: BackgroundColor,
  linearGradient: BackgroundLinearGradient
} & Settings;

export type FontSize = {
  value: number,
  unit: Unit
} & Settings;

export type Border = {
  width: BorderWidth,
  style: BorderStyle,
  color: string,
} & Settings;

export type BorderRadius = {
  value: number,
  unit: Unit
} & Settings;

export type Padding = {
  value: number,
  unit: Unit
} & Settings;

export type Color = {
  hex: string,
} & Settings;

export type Cursor = {
  keyword: CursorKeyword,
} & Settings;

export type FontWeight = {
  value: number,
} & Settings;

type BorderWidth = {
  value: number,
  unit: Unit
};

type BackgroundColor = {
  color: string
};

type BackgroundLinearGradient = {
  colors: string[]
};

type Settings = {
  active: boolean,
};
