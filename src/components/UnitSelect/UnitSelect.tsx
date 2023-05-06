import Input from '../Input/Input';
import { InputType } from '../Input/input-types';
import './UnitSelect.css';
import { UnitSelectProperties } from './unit-select-types';

function UnitSelect(props: UnitSelectProperties) {
  return (
    <div id={props.id} className="unit-select">
      <Input type={InputType.Number} value={props.value} onChange={props.valueOnChange} />
      <select value={props.unit} onChange={props.unitOnChange}>
        <option value="px">px</option>
        <option value="cm">cm</option>
        <option value="mm">mm</option>
        <option value="Q">Q</option>
        <option value="in">in</option>
        <option value="pc">pc</option>
        <option value="pt">pt</option>
      </select>
    </div>
  )
}

export default UnitSelect;
