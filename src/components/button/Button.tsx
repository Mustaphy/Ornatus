import { Link } from 'react-router-dom';
import './Button.css'

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
