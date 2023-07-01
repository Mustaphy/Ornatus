import { InputProperties } from './InputTypes';
import './Input.css'

function Input({id, type, value, min, max, step, checked, disabled, onChange}: InputProperties) {
  return (
    <input
      id={id}
      className={'ornatus-input'}
      type={type}
      value={value}
      min={min}
      max={max}
      step={step}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
  )
}

export default Input;