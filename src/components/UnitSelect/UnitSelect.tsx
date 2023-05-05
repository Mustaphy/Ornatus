import Input from '../Input/Input';
import { InputType } from '../Input/input-types';
import './UnitSelect.css';
import { UnitSelectProperties } from './unit-select-types';

function UnitSelect(props: UnitSelectProperties) {
  return (
    <div id={props.id} className="unit-select">
      <Input type={InputType.Number} value={props.value} onChange={props.valueOnChange} />
      <select value={props.unit} onChange={props.unitOnChange}>
        <option>px</option>
        <option>cm</option>
        <option>mm</option>
        <option>Q</option>
        <option>in</option>
        <option>pc</option>
        <option>pt</option>
      </select>
    </div>
  )
}

export default UnitSelect;
