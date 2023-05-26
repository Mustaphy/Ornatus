import { InputProperties } from './input-types';
import './Input.css'

function Input(props: InputProperties) {
  return (
    <input
      id={props.id}
      className={`styleface-input styleface-${props.type}`}
      type={props.type} value={props.value}
      onChange={props.onChange}
    />
  )
}

export default Input;