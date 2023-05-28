import { ChangeEventHandler } from "react";

export interface UnitSelectProperties {
  id?: string,
  value: number,
  unit: string,
  valueOnChange: ChangeEventHandler<HTMLInputElement>,
  unitOnChange: ChangeEventHandler<HTMLSelectElement>,
}
