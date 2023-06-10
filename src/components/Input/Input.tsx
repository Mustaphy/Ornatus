import { InputProperties } from './InputInterfaces';
import './Input.css'

function Input(props: InputProperties) {
  return (
    <input
      id={props.id}
      className={'styleface-input'}
      type={props.type}
      value={props.value}
      min={props.min}
      max={props.max}
      step={props.step}
      checked={props.checked}
      disabled={props.disabled}
      onChange={props.onChange}
    />
  )
}

export default Input;