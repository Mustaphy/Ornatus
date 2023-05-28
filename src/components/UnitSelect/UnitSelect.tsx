import Input from '../Input/Input';
import './UnitSelect.css';
import { UnitSelectProperties } from './UnitSelectInterfaces';
import Select from "../Select/Select";
import { units } from './UnitSelectTypes';

function UnitSelect(props: UnitSelectProperties) {
  return (
    <div id={props.id} className="styleface-unit-select">
      <Input type="number" value={props.value} onChange={props.valueOnChange} />
      <Select value={props.unit} options={units.slice()} onChange={props.unitOnChange} />
    </div>
  )
}

export default UnitSelect;
