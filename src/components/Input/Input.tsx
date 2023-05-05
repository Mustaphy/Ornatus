import { InputProperties } from './input-types';
import './Input.css'

function Input(props: InputProperties) {
  const getClassName = (): string => {
    return `styleface-input styleface-${props.type}`;
  }

  return (
    <>
      <input id={props.id} className={getClassName()} type={props.type} value={props.value} onChange={props.onChange} />
    </>
  )
}

export default Input;