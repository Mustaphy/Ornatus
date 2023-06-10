import { CSSProperties } from "react";
import { Value } from "../../pages/ElementDesigner/ElementDesignerTypes";
import { Type } from "../Input/InputTypes";
import { ElementSelector } from "../../pages/ElementDesigner/ElementDesignerTypes";

export interface PreviewElementProperties {
  element: ElementSelector,
  style: CSSProperties,
  innerText: string,
  value: Value,
  type: Type,
  checked?: string,
}
