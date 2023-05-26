import {ChangeEvent, useRef, useState} from 'react';
import './ButtonDesigner.css'
import { Background, Border, BorderRadius, FontSize, Padding } from './button-designer-types';
import Input from '../../components/Input/Input'
import { InputType } from '../../components/Input/input-types';
import UnitSelect from '../../components/UnitSelect/UnitSelect';
import Select from "../../components/Select/Select";

function ButtonDesigner() {
  const [text, setText] = useState('Design your own button!');
  const [background, setBackground] = useState({
    selected: 'color',
    color: { color: '#000000' },
    linearGradient: { colors: ['#000000', '#ffffff'] }
  } as Background);
  const [color, setColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState({
    value: 16,
    unit: 'px'
  } as FontSize);
  const [fontWeight, setFontWeight] = useState('400');
  const [border, setBorder] = useState({
    width: { value: 1, unit: 'px' },
    style: 'solid',
    color: '#ffffff'
  } as Border);
  const [borderRadius, setBorderRadius] = useState({
    value: 8,
    unit: 'px'
  } as BorderRadius);
  const [padding, setPadding] = useState({
    value: 8,
    unit: 'px'
  } as Padding);
  const [cursor, setCursor] = useState('pointer');

  const backgroundOptions = useRef(['color', 'linear-gradient']);
  const fontWeightOptions = useRef(['100', '200', '300', '400', '500', '600', '700', '800', '900']);
  const borderOptions = useRef(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset']);
  const cursorOptions = useRef([
    'pointer', 'default', 'none', 'context-menu', 'help', 'progress', 'wait', 'cell', 'crosshair', 'text',
    'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'grab', 'grabbing', 'all-scroll', 'col-resize',
    'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize',
    'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out'
  ]);

  const handleLinearGradientBackgroundChanged = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
    const colors = background.linearGradient.colors;
    colors[index] = event.target.value;
    setBackground({ ...background, linearGradient: { colors: colors } });
  }

  const getBackground = (): string => {
    switch (background.selected) {
      case 'color':
        return background.color.color;
      case 'linear-gradient':
        return `linear-gradient(${background.linearGradient.colors[0]}, ${background.linearGradient.colors[1]})`;
      default:
        return '';
    }
  }

  const generateHTML = (): string => {
    return (
      `<button id="styleface-button">` +
      `\n  ${text}\n` +
      `</button>`
    );
  }

  const generateCSS = (): string => {
    return (
      `#styleface-button {\n` +
        `  background: ${getBackground()};\n` +
        `  color: ${color};\n` +
        `  font-size: ${fontSize.value + fontSize.unit};\n` +
        `  font-weight: ${fontWeight};\n` +
        `  border: ${border.width.value + border.width.unit} ${border.style} ${border.color};\n` +
        `  border-radius: ${borderRadius.value + borderRadius.unit};\n` +
        `  padding: ${padding.value + padding.unit};\n` +
        `  cursor: ${cursor};\n` +
      `}`
    );
  }

  return (
    <div id="button-designer">
      <div id="button-preview">
        <button
          style={
            {
              background: getBackground(),
              color: color,
              fontSize: `${fontSize.value + fontSize.unit}`,
              fontWeight: fontWeight,
              border: `${border.width.value + border.width.unit} ${border.style} ${border.color}`,
              borderRadius: `${borderRadius.value + borderRadius.unit}`,
              padding: `${padding.value + padding.unit}`,
              cursor: cursor
            }
          }
        >
          {text}
        </button>
      </div>

      <div id="button-options">
        <div id="text-container">
          <label htmlFor="text" className="option-name">text</label>
          <Input id="text" type={InputType.Text} value={text} onChange={(event) => setText(event.target.value)} />
        </div>

        <div id="background-container">
          <label htmlFor="background-type" className="option-name">background</label>
          <Select id="background-type" value={background.selected} options={backgroundOptions.current} onChange={(event) => setBackground({ ...background, selected: event.target.value })} />
  
          {
            background.selected == 'color' &&
              <Input type={InputType.Color} value={background.color.color} onChange={(event) => setBackground({ ...background, color: { color: event.target.value } })} />
          }
          {
            background.selected == 'linear-gradient' &&
              <>
                <Input type={InputType.Color} value={background.linearGradient.colors[0]} onChange={(event) => handleLinearGradientBackgroundChanged(event, 0)} />
                <Input type={InputType.Color} value={background.linearGradient.colors[1]} onChange={(event) => handleLinearGradientBackgroundChanged(event, 1)} />
              </>
          }
        </div>

        <div id="color-container">
          <label htmlFor="color" className="option-name">color</label>
          <Input id="color" type={InputType.Color} value={color} onChange={(event) => setColor(event.target.value)} />
        </div>

        <div id="font-size-container">
          <label htmlFor="font-size" className="option-name">font-size</label>
          <UnitSelect
            id="font-size"
            value={fontSize.value}
            unit={fontSize.unit} 
            valueOnChange={(event) => setFontSize({ ...fontSize, value: Number(event.target.value) })}
            unitOnChange={(event) => setFontSize({ ...fontSize, unit: event.target.value })}
          />
        </div>

        <div id="font-weight-container">
          <label htmlFor="font-weight" className="option-name">font-weight</label>
          <Select id="font-weight" value={fontWeight} options={fontWeightOptions.current} onChange={(event) => setFontWeight(event.target.value)} />
        </div>

        <div id="border-container">
          <label htmlFor="border" className="option-name">border</label>
          <UnitSelect
            value={border.width.value}
            unit={border.width.unit} 
            valueOnChange={(event) => setBorder({ ...border, width: { ...border.width, value: Number(event.target.value) } })}
            unitOnChange={(event) => setBorder({ ...border, width: { ...border.width, unit: event.target.value } })}
          />
          <Select value={border.style} options={borderOptions.current} onChange={(event) => setBorder({ ...border, style: event.target.value })} />
          <Input type={InputType.Color} value={border.color} onChange={(event) => setBorder({ ...border, color: event.target.value })} />
        </div>

        <div id="border-radius-container">
          <label htmlFor="border-radius" className="option-name">border-radius</label>
          <UnitSelect
            id="border-radius"
            value={borderRadius.value}
            unit={borderRadius.unit} 
            valueOnChange={(event) => setBorderRadius({ ...borderRadius, value: Number(event.target.value) })}
            unitOnChange={(event) => setBorderRadius({ ...borderRadius, unit: event.target.value })}
          />
        </div>

        <div id="padding-container">
          <label htmlFor="padding" className="option-name">padding</label>
          <UnitSelect
            id="padding"
            value={padding.value}
            unit={padding.unit} 
            valueOnChange={(event) => setPadding({ ...padding, value: Number(event.target.value) })}
            unitOnChange={(event) => setPadding({ ...padding, unit: event.target.value })}
          />
        </div>

        <div id="cursor-container">
          <label htmlFor="cursor" className="option-name">cursor</label>
          <Select id="cursor" value={cursor} options={cursorOptions.current} onChange={(event) => setCursor(event.target.value)} />
        </div>
      </div>

      <div id="button-code">
        <pre id="button-html" className="code-container">
          {generateHTML()}
        </pre>

        <pre id="button-css" className="code-container">
          {generateCSS()}
        </pre>
      </div>
    </div>
  )
}

export default ButtonDesigner;