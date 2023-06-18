import { TreeNode } from "../components/TreeView/TreeViewTypes";
import { Element } from "../pages/ElementDesigner/ElementDesignerTypes";
import { toCamelCase } from "./utilities";

export class HtmlEngine {
  /**
   * Get if the attribute is being used on the element
   * @param {Element} element Element to check if the attribute is being used
   * @param {keyof Element['attributes'] | 'checked'} attribute Attribute to check if it is being used
   * @returns {boolean} Returns if the attribute is being used on the element
   */
  static isBeingUsed = (element: Element, attribute: keyof Element['attributes'] | 'checked'): boolean => {
    switch (attribute) {
      case 'id':
        return true;
      case 'type':
        return element.selector === 'input' || element.selector === 'button';
      case 'value':
        return (element.selector === 'input' && element.attributes.type !== 'checkbox') || element.selector === 'textarea';
      case 'checked':
        return this.isChecked(element);
      default:
        return false;
    }
  }

  /**
   * Get the value of a attribute that should be used in the CSS
   * @param {Element} element Element to get the value for
   * @param {keyof Element['attributes'] | 'checked'} attribute Attribute to get the value for
   * @returns {string} Returns the value of the attribute for the element
   */
  static getValue = (element: Element, property: keyof Element['attributes'] | 'checked'): string | boolean => {
    const properties = element.attributes;

    switch (property) {
      case 'id':
      case 'type':
        return properties[property];
      case 'value':
        return this.getCurrentValue(element);
      case 'checked':
        return this.isChecked(element);
      default:
        return '';
    }
  }

  /**
   * Get the value that is used currently, based on the selected input type (e.g. text, number)
   * @param {Element} element Element to get the current value for
   * @returns {string} Returns the current value based on the selected input type
   */
  static getCurrentValue = (element: Element): string => {
    const formattedType = toCamelCase(element.attributes.type) as keyof typeof element.attributes.value;
    return element.attributes.value[formattedType].toString();
  }

  /**
   * Get if the checkbox is checked or not
   * @param {Element} element The element to check if it is checked 
   * @returns {boolean} Returns true if the checkbox is checked, false otherwise
   */
  static isChecked = (element: Element): boolean => {
    return element.selector === 'input' && element.attributes.type === 'checkbox' && element.attributes.value.checkbox;
  }

  /**
   * Get the names of the attributes of the element
   * @param {Element} element Element to get the attributes for
   * @returns {string[]} Returns the attributes of the element
   */
  static getAttributes = (element: Element): (keyof Element['attributes'] | 'checked')[] => {
    return [...Object.keys(element.attributes), 'checked'] as (keyof Element['attributes'] | 'checked')[];
  }

  /**
   * Get a string of valid HTML of the current state of the element
   * @param {TreeNode[]} nodes Nodes to generate HTML for
   * @param {number} indent Indentation level of the HTML (defaults to 0)
   * @returns {string} Returns a string of valid HTML of the current state of the element
   */
  static getString = (nodes: TreeNode[], indent: number = 0): string => {
    return nodes.reduce((acc, node) => {
      const { element, children } = node;
      const attributeKeys = this.getAttributes(element);
      const selfClosingElements = ['input', 'textarea'];
      const isSelfClosing = selfClosingElements.includes(element.selector);
      const spaces = ' '.repeat(indent);

      const attributes = attributeKeys
        .filter(attribute => this.isBeingUsed(element, attribute))
        .map(attribute => {
          const value = this.getValue(element, attribute);

          return typeof value === 'string'
            ? `${attribute}="${value}"`
            : attribute
        });

      let attributesString: string;

      // If there is only one attribute, we can put it on the same line. Otherwise, we put all of them below each other
      attributes.length === 1
        ? attributesString = `${attributes[0]}`
        : attributesString = `\n${spaces}  ${attributes.join(`\n${spaces}  `)}\n${spaces}`

      // Self-closing elements cannot have children or innerText
      if (attributes.length > 0 && isSelfClosing)
        return `${acc}${spaces}<${element.selector} ${attributesString}/>\n`;

      let result = `${spaces}<${element.selector} ${attributesString}>\n`;

      if (element.innerText)
        result += `${spaces}  ${element.innerText}\n`;
      if (children)
        result += this.getString(children, indent + 2);

      result += `${spaces}</${element.selector}>\n`;

      return `${acc}${result}`;
    }, '');
  };
}