import Input from '../Input/Input';
import './UnitSelect.css';
import Select from "../Select/Select";
import { UnitSelectProperties, units } from './UnitSelectTypes';

function UnitSelect({id, value, unit, valueOnChange, unitOnChange}: UnitSelectProperties) {
  return (
    <div id={id} className="styleface-unit-select">
      <Input type="number" value={value} onChange={valueOnChange} />
      <Select value={unit} options={units.slice()} onChange={unitOnChange} />
    </div>
  )
}

export default UnitSelect;
