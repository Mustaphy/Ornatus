import { TreeNode } from "../components/TreeView/TreeViewTypes";
import { Element } from "../pages/ElementDesigner/ElementDesignerTypes";
import { toKebabCase } from "./utilities";

export class CssEngine {
  /**
   * Get if the property is being used on the element
   * @param {Element} element Element to check if the property is being used
   * @param {keyof Element['properties']} property Property to check if it is being used
   * @returns {boolean} Returns if the property is being used on the element
   */
  static isBeingUsed = (element: Element, property: keyof Element['properties']): boolean => {
    const properties = element.properties;

    switch (property) {
      case 'gridAutoFlow':
        return properties.gridAutoFlow.active && properties.display.active && properties.display.keyword.includes('grid');
      case 'alignItems':
      case 'alignContent':
      case 'justifyItems':
      case 'justifyContent':
        return properties[property].active && properties.display.active && (properties.display.keyword.includes('grid') || properties.display.keyword.includes('flex'));
      case 'color':
      case 'fontSize':
      case 'fontWeight':
      case 'textAlign':
      case 'textTransform':
        return properties[property].active && this.currentSelectionHasText(element);
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

  /**
   * Get the value of a property that should be used in the CSS
   * @param {Element} element Element to get the value for
   * @param {keyof Element['properties']} property Property to get the value for
   * @returns {string} Returns the value of the property for the element
   */
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
      case 'height':
      case 'width':
      case 'borderRadius':
      case 'margin':
      case 'padding':
      case 'fontSize':
        return `${properties[property].value}${properties[property].unit}`;
      case 'display':
      case 'gridAutoFlow':
      case 'textAlign':
      case 'cursor':
      case 'textTransform':
      case 'alignItems':
      case 'alignContent':
      case 'justifyItems':
      case 'justifyContent':
        return properties[property].keyword;
      default:
        return '';
    }
  }

  /**
   * Get if the current state of the element has text on it
   * @param {Element} element Element to check if it has text on it
   * @returns {boolean} Returns if the current state of the element has text on it
   */
  static currentSelectionHasText = (element: Element): boolean => {
    return element.selector !== 'input' || (element.attributes.type !== 'color' && element.attributes.type !== 'checkbox');
  }

  /**
   * Get the value of the background property based on the element
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

  /**
   * Get the names of the properties of the element
   * @param {Element} element Element to get the properties for
   * @returns {string[]} Returns the properties of the element
   */
  static getProperties = (element: Element): (keyof Element['properties'])[] => {
    return Object.keys(element.properties) as (keyof Element['properties'])[];
  }

  /**
   * Get a string of valid CSS of the current state of the element
   * @param {TreeNode[]} nodes Nodes to generate CSS for (defaults to the tree)
   * @returns {string} Returns a string of valid CSS of the current state of the element
   */
  static getString = (nodes: TreeNode[]): string => {
    return nodes.reduce((css, node) => {
      const { element, children } = node;
      const properties = this.getProperties(element);
  
      css += `#${element.attributes.id} {\n`;
    
      properties.forEach(property => {  
        if (this.isBeingUsed(element, property))
          css += `  ${toKebabCase(property)}: ${this.getValue(element, property)};\n`;
      });
  
      css += `}\n\n`;
  
      if (children)
        css += this.getString(children);
  
      return css;
    }, '');
  };

  /**
   * Get the styles that can be used for a JSX element
   * @param {Element} element The element to get the styles for
   * @returns {Record<string, string>} Returns the styles for the element
   */
  static getJSX = (element: Element): Record<string, string> => {
    const properties = this.getProperties(element);
    const styles: Record<string, string> = {};

    properties.forEach(property => {
      if (this.isBeingUsed(element, property))
        styles[property] = this.getValue(element, property);
    });

    return styles;
  };
}