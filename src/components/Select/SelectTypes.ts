import { ChangeEventHandler } from "react";

export type SelectProperties = {
  id?: string,
  value: string,
  options: string[],
  onChange: ChangeEventHandler<HTMLSelectElement>
}
