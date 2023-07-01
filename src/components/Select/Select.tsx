import './Select.css';
import { SelectProperties } from "./SelectTypes";

function Select(props: SelectProperties) {
  return (
    <select className="ornatus-select" value={props.value} onChange={props.onChange}>
      {
        props.options.map((option, index) =>
          <option key={index} value={option}>{option}</option>
        )
      }
    </select>
  )
}

export default Select;