import { ChangeEventHandler } from "react"

export const types = [
  'button', 'color', 'checkbox', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'reset', 'search',
  'submit', 'tel', 'text', 'time', 'url', 'week'
] as const;
export type Type = typeof types[number];

export type InputProperties = {
  id?: string;
  type: Type;
  value?: string | number;
  min?: number;
  max?: number;
  step?: number;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
