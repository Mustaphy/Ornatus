export const types = [
  'button', 'color', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'reset', 'search', 'submit',
  'tel', 'text', 'time', 'url', 'week'
] as const;
export type Type = typeof types[number];
