import { Link } from 'react-router-dom';
import './Button.css'
import { ButtonProperties } from './button-types';

function Button(props: ButtonProperties) {
  return (
    <>
      <Link to={props.path}>
        <button id="button-element">
          {props.text}
        </button>
      </Link>
    </>
  )
}

export default Button;
