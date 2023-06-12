import { Element, PropertyCondition } from "../../pages/ElementDesigner/ElementDesignerTypes";
import { TreeNode } from "../TreeView/TreeView";

export type ElementPreviewProps = {
  hierarchy: TreeNode[];
  getPropertyConditions: (element: Element) => PropertyCondition[];
}
