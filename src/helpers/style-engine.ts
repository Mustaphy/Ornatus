import { TreeNode } from "../components/TreeView/TreeViewTypes";
import { Element } from "../pages/ElementDesigner/ElementDesignerTypes";

export class StyleEngine {
  static isBeingUsed = (element: Element, property: keyof Element['properties']): boolean => {
    const properties = element.properties;

    switch (property) {
      case 'gridAutoFlow':
        return properties.gridAutoFlow.active && properties.display.active && properties.display.keyword.includes('grid');
      case 'color':
        case 'fontSize':
        case 'fontWeight':
        case 'textAlign':
          return properties[property].active && StyleEngine.currentSelectionHasText(element);
      case 'display':
      case 'height':
      case 'width':
      case 'background':
      case 'border':
      case 'borderRadius':
      case 'margin':
      case 'padding':
      case 'cursor':
        return properties[property].active;
      default:
        return false;
    }
  }

  static getValue = (element: Element, property: keyof Element['properties']): string => {
    const properties = element.properties;

    switch (property) {
      case 'background':
        return this.getBackgroundStyling(element);
      case 'color':
        return properties.color.hex;
      case 'fontWeight':
        return element.properties.fontWeight.value.toString();
      case 'border':
        return `${element.properties.border.width.value + element.properties.border.width.unit} ${element.properties.border.style} ${element.properties.border.color}`;
      case 'display':
      case 'gridAutoFlow':
      case 'textAlign':
      case 'cursor':
        return properties[property].keyword;
      case 'height':
      case 'width':
      case 'borderRadius':
      case 'margin':
      case 'padding':
      case 'fontSize':
        return `${properties[property].value}${properties[property].unit}`;
      default:
        return '';
    }
  }

  /**
   * Get a string of valid CSS of the current state of the element
   * @param {TreeNode[]} nodes Nodes to generate CSS for (defaults to the tree)
   * @returns {string} Returns a string of valid CSS of the current state of the element
   */
  static generateCSS = (nodes: TreeNode[]): string => {
    return nodes.reduce((css, node) => {
      const { element, children } = node;
      const properties = Object.keys(element.properties) as (keyof Element['properties'])[];
  
      css += `#${element.attributes.id} {\n`;
    
      properties.forEach(property => {  
        if (this.isBeingUsed(element, property))
          css += `  ${property}: ${this.getValue(element, property)};\n`;
      });
  
      css += `}\n\n`;
  
      if (children)
        css += StyleEngine.generateCSS(children);
  
      return css;
    }, '');
  };

  /**
   * Get if the current state of the element has text on it
   * @param {Element} element Element to check if it has text on it
   * @returns {boolean} Returns if the current state of the element has text on it
   */
  static currentSelectionHasText = (element: Element): boolean => {
    return element.selector  !== 'input' || (element.attributes.type !== 'color' && element.attributes.type !== 'checkbox');
  }

  /**
   * Get the value of the background property based on the current state
   * @param {Element} element Element to get the background styling for
   * @returns {string} Returns the string that is used for the background property in the CSS
   */
  static getBackgroundStyling = (element: Element): string => {
    const background = element.properties.background;

    switch (background.selected) {
      case 'color':
        return background.color.color;
      case 'linear-gradient':
        return `linear-gradient(${background.linearGradient.colors[0]}, ${background.linearGradient.colors[1]})`;
      default:
        return '';
    }
  }
}