import { Element } from "../../pages/ElementDesigner/ElementDesignerTypes";

export type TreeNode = {
  element: Element;
  children?: TreeNode[];
  onClick: () => void;
}

export type TreeViewProps = {
  data: TreeNode[];
  selectedElementId: string;
  onChange: (tree: TreeNode[]) => void;
}
