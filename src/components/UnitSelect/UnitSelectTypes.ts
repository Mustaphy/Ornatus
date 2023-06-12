import { ChangeEventHandler } from "react";

export const units = [
  'px', 'cm', 'mm', 'Q', 'in', 'pc', 'pt', '%'
] as const;
export type Unit = typeof units[number];

export type UnitSelectProperties = {
  id?: string;
  value: number;
  unit: string;
  valueOnChange: ChangeEventHandler<HTMLInputElement>;
  unitOnChange: ChangeEventHandler<HTMLSelectElement>;
}
