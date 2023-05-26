import {ChangeEventHandler} from "react";

export interface SelectProperties {
  id?: string,
  value: string,
  options: string[],
  onChange: ChangeEventHandler<HTMLSelectElement>
}