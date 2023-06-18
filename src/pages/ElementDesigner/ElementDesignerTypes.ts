import { Type } from "../../components/Input/InputTypes";
import { Unit } from "../../components/UnitSelect/UnitSelectTypes";

export type Element = {
  uuid: string,
  selector: Selector,
  innerText: string,
  attributes: {
    id: string,
    type: Type,
    value: Value
  },
  properties: {
    display: Display,
    gridAutoFlow: GridAutoFlow,
    height: Height,
    width: Width,
    background: Background,
    color: Color,
    fontSize: FontSize,
    fontWeight: FontWeight,
    textAlign: TextAlign,
    border: Border,
    borderRadius: BorderRadius,
    padding: Padding,
    margin: Margin,
    cursor: Cursor,
  }
};

/* Values that can be selected */
export const displayKeywords = [
  'block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'flow-root', 'none', 'contents',
  'block flow', 'inline flow', 'inline flow-root', 'block flex', 'inline flex', 'block grid', 'inline grid',
  'block flow-root', 'table', 'table-row', 'table-cell', 'list-item'
] as const;
export type DisplayKeyword = typeof displayKeywords[number];

export const gridAutoFlowKeywords = [
  'row', 'column', 'dense', 'row dense', 'column dense'
] as const;
export type GridAutoFlowKeyword = typeof gridAutoFlowKeywords[number];

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

export const textAlignKeywords = [
  'start', 'end', 'left', 'right', 'center', 'justify', 'justify-all', 'match-parent'
] as const;
export type TextAlignKeyword = typeof textAlignKeywords[number];

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

export type Display = {
  keyword: DisplayKeyword,
  active: false
} & Property;

export type GridAutoFlow = {
  keyword: GridAutoFlowKeyword
} & Property;

export type Height = {
  value: number,
  unit: Unit
} & Property;

export type Width = {
  value: number,
  unit: Unit
} & Property;

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

export type Background = {
  selected: BackgroundProperty,
  color: BackgroundColor,
  linearGradient: BackgroundLinearGradient
} & Property;

export type Color = {
  hex: string,
} & Property;

export type FontSize = {
  value: number,
  unit: Unit
} & Property;

export type FontWeight = {
  value: number,
} & Property;

export type TextAlign = {
  keyword: TextAlignKeyword,
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

export type Cursor = {
  keyword: CursorKeyword,
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
