import { Element, ConditionalValue } from "../../pages/ElementDesigner/ElementDesignerTypes";
import { TreeNode } from "../TreeView/TreeViewTypes";

export type ElementPreviewProps = {
  tree: TreeNode[];
  getStylingConditions: (element: Element) => ConditionalValue[];
  getCurrentValue: (element: Element) => string;
  isChecked: (element: Element) => boolean;
}
