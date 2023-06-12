import { Element, StylingCondition } from "../../pages/ElementDesigner/ElementDesignerTypes";
import { TreeNode } from "../TreeView/TreeViewTypes";

export type ElementPreviewProps = {
  tree: TreeNode[];
  getPropertyConditions: (element: Element) => StylingCondition[];
}
