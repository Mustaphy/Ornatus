import { Element } from "../../pages/ElementDesigner/ElementDesignerTypes";
import { TreeNode } from "../TreeView/TreeViewTypes";

export type ElementPreviewProps = {
  tree: TreeNode[];
  getCurrentValue: (element: Element) => string;
  isChecked: (element: Element) => boolean;
}
