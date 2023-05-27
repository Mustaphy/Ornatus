import './PreviewElement.css';
import { PreviewElementProperties } from './preview-element-types';

function PreviewElement(props: PreviewElementProperties) {
  const Element = props.element as keyof JSX.IntrinsicElements;

  switch (props.element) {
    case 'input':
      return (
        <input
          type={props.inputType}
          value={props.value[props.inputType]}
          style={props.style} 
          readOnly
        />
      )
    case 'textarea':
      return (
        <textarea value={props.value.text} style={props.style} readOnly />
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