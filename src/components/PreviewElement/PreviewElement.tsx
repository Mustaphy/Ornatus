import { toCamelCase } from '../../utilities';
import './PreviewElement.css';
import { PreviewElementProperties } from './PreviewElementInterfaces';

function PreviewElement(props: PreviewElementProperties) {
  const Element = props.element as keyof JSX.IntrinsicElements;

  /**
   * Get the value that is used currently, based on the selected input type (e.g. text, number)
   * @returns {string} Returns the current value based on the selected input type
   */
  const getCurrentValue = (): string => {
    const formattedInputType = toCamelCase(props.type) as keyof typeof props.value;
    return props.value[formattedInputType].toString();
  }

  switch (props.element) {
    case 'input':
      return (
        <input
          type={props.type}
          value={getCurrentValue()}
          style={props.style}
          checked={Boolean(props.checked)}
          readOnly
        />
      )
    case 'textarea':
      return (
        <textarea
          value={props.value.text}
          style={props.style}
          readOnly
        />
      )
    default:
      return ( 
        <Element style={props.style}>
          {props.innerText}
        </Element>
      )
  }
}

export default PreviewElement;