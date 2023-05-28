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
