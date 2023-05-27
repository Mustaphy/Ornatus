import { Value } from "../../pages/ElementDesigner/element-designer-types";
import { InputType } from "../Input/input-types";

export interface PreviewElementProperties {
  element: string,
  style: any,
  innerText: string,
  value: Value,
  inputType: InputType,
}