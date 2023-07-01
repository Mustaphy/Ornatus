import { Link } from 'react-router-dom';
import './Button.css'
import { ButtonProperties } from './ButtonTypes';

function Button({text, path}: ButtonProperties) {
  return (
    <Link to={path}>
      <button className="ornatus-button">
        {text}
      </button>
    </Link>
  )
}

export default Button;
