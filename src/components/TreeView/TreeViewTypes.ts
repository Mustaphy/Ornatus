import { Element } from "../../pages/ElementDesigner/ElementDesignerTypes";
import { toast } from 'react-toastify';

export type TreeNode = {
  element: Element;
  children?: TreeNode[];
  onClick: () => void;
}

export type TreeViewProps = {
  tree: TreeNode[];
  selectedElementId: string;
  toast: typeof toast,
  onChange: (tree: TreeNode[]) => void;
}
