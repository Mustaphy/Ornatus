import Input from '../Input/Input';
import { InputType } from '../Input/input-types';
import './UnitSelect.css';
import { UnitSelectProperties } from './unit-select-types';
import Select from "../Select/Select";

function UnitSelect(props: UnitSelectProperties) {
  const units = ['px', 'cm', 'mm', 'Q', 'in', 'pc', 'pt', '%'];

  return (
    <div id={props.id} className="styleface-unit-select">
      <Input type={InputType.Number} value={props.value} onChange={props.valueOnChange} />
      <Select value={props.unit} options={units} onChange={props.unitOnChange} />
    </div>
  )
}

export default UnitSelect;
