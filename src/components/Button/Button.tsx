import { Link } from 'react-router-dom';
import './Button.css'
import { ButtonProperties } from './button-types';

function Button(props: ButtonProperties) {
  return (
    <Link to={props.path}>
      <button className="styleface-button">
        {props.text}
      </button>
    </Link>
  )
}

export default Button;
