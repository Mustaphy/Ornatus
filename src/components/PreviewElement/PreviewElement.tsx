import './PreviewElement.css';
import { PreviewElementProperties } from './preview-element-types';

function PreviewElement(props: PreviewElementProperties) {
  const Element = props.element as keyof JSX.IntrinsicElements;

  switch (props.element) {
    case 'input':
    case 'textarea':
      return (
        <Element style={props.style} value={props.innerText} readOnly />
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