import { Type } from "../../components/Input/InputTypes";
import { Unit } from "../../components/UnitSelect/UnitSelectTypes";

export type Element = {
  uuid: string,
  selector: Selector,
  id: string,
  type: Type,
  value: Value
  innerText: string,
  height: Height,
  width: Width,
  background: Background,
  color: Color,
  fontSize: FontSize,
  fontWeight: FontWeight,
  border: Border,
  borderRadius: BorderRadius,
  padding: Padding,
  margin: Margin,
  cursor: Cursor,
};

/* Values that can be selected */
export const selectors = [
  'a', 'abbr', 'address', 'article', 'aside', 'b', 'bdi', 'bdo', 'blockquote', 'button', 'cite', 'code', 'div', 'em',
  'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'input', 'ins', 'kbd', 'label', 'main', 'mark',  'nav',
  'output', 'p', 'pre', 'q', 's', 'samp', 'section', 'small', 'span', 'strong', 'sub', 'sup', 'textarea',  'time',  'u',
  'var'
] as const;
export type Selector = typeof selectors[number];

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

/* Input fields */
export type Property = {
  active: boolean
}

export type Value = {
  button: string,
  color: string,
  checkbox: boolean,
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
} & Property;

export type Height = {
  value: number,
  unit: Unit
} & Property;

export type Width = {
  value: number,
  unit: Unit
} & Property;

export type Background = {
  selected: BackgroundProperty,
  color: BackgroundColor,
  linearGradient: BackgroundLinearGradient
} & Property;

export type FontSize = {
  value: number,
  unit: Unit
} & Property;

export type Border = {
  width: BorderWidth,
  style: BorderStyle,
  color: string,
} & Property;

export type BorderRadius = {
  value: number,
  unit: Unit
} & Property;

export type Margin = {
  value: number,
  unit: Unit
} & Property;

export type Padding = {
  value: number,
  unit: Unit
} & Property;

export type Color = {
  hex: string,
} & Property;

export type Cursor = {
  keyword: CursorKeyword,
} & Property;

export type FontWeight = {
  value: number,
} & Property;

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

export type ConditionalValue = {
  property: string;
  value: string | boolean;
  condition: boolean;
};
