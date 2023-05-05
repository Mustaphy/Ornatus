import { ChangeEvent, useState } from 'react';
import './ButtonDesigner.css'
import { Background, BorderRadius, FontSize, Padding } from './button-designer-types';
import Input from '../../components/Input/Input'
import { InputType } from '../../components/Input/input-types';

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
  const [borderRadius, setBorderRadius] = useState({
    value: 8,
    unit: 'px'
  } as BorderRadius);
  const [padding, setPadding] = useState({
    value: 8,
    unit: 'px'
  } as Padding);
  const [cursor, setCursor] = useState('pointer');

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
    return `
      <button id="styleface-button">
        ${text}
      </button>
    `;
  }

  const generateCSS = (): string => {
    return `
      #styleface-button {
        background: ${getBackground()};
        color: ${color};
        font-size: ${fontSize.value + fontSize.unit};
        border-radius: ${borderRadius.value + borderRadius.unit};
        padding: ${padding.value + padding.unit};
        cursor: ${cursor}
      }
    `;
  }

  return (
    <>
      <div id="button-preview">
        <button
          style={
            {
              background: getBackground(),
              color: color,
              fontSize: `${fontSize.value + fontSize.unit}`,
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
          <select id="background-type" value={background.selected} onChange={(event) => setBackground({ ...background, selected: event.target.value })}>
            <option>color</option>
            <option>linear-gradient</option>
          </select>
  
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
          <Input id="font-size" type={InputType.Number} value={fontSize.value} onChange={(event) => setFontSize({ ...fontSize, value: Number(event.target.value) })} />
          <select id="font-size-unit" value={fontSize.unit} onChange={(event) => setFontSize({ ...fontSize, unit: event.target.value })}>
            <option>px</option>
            <option>cm</option>
            <option>mm</option>
            <option>Q</option>
            <option>in</option>
            <option>pc</option>
            <option>pt</option>
          </select>
        </div>

        <div id="border-radius-container">
          <label htmlFor="border-radius" className="option-name">border-radius</label>
          <Input id="border-radius" type={InputType.Number} value={borderRadius.value} onChange={(event) => setBorderRadius({ ...borderRadius, value: Number(event.target.value) })} />
          <select id="border-radius-unit" value={borderRadius.unit} onChange={(event) => setBorderRadius({ ...borderRadius, unit: event.target.value })}>
            <option>px</option>
            <option>cm</option>
            <option>mm</option>
            <option>Q</option>
            <option>in</option>
            <option>pc</option>
            <option>pt</option>
          </select>
        </div>

        <div id="padding-container">
          <label htmlFor="padding" className="option-name">padding</label>
          <Input id="padding" type={InputType.Number} value={padding.value} onChange={(event) => setPadding({ ...padding, value: Number(event.target.value) })} />
          <select id="padding-unit" value={padding.unit} onChange={(event) => setPadding({ ...padding, unit: event.target.value })}>
            <option>px</option>
            <option>cm</option>
            <option>mm</option>
            <option>Q</option>
            <option>in</option>
            <option>pc</option>
            <option>pt</option>
          </select>
        </div>

        <div id="cursor-container">
          <label htmlFor="cursor" className="option-name">cursor</label>
          <select id="cursor" value={cursor} onChange={(event) => setCursor(event.target.value)}>
            <option>auto</option>
            <option>default</option>
            <option>none</option>
            <option>context-menu</option>
            <option>help</option>
            <option>pointer</option>
            <option>progress</option>
            <option>wait</option>
            <option>cell</option>
            <option>crosshair</option>
            <option>text</option>
            <option>vertical-text</option>
            <option>alias</option>
            <option>copy</option>
            <option>move</option>
            <option>no-drop</option>
            <option>not-allowed</option>
            <option>grab</option>
            <option>grabbing</option>
            <option>all-scroll</option>
            <option>col-resize</option>
            <option>row-resize</option>
            <option>n-resize</option>
            <option>e-resize</option>
            <option>s-resize</option>
            <option>w-resize</option>
            <option>ne-resize</option>
            <option>nw-resize</option>
            <option>se-resize</option>
            <option>sw-resize</option>
            <option>ew-resize</option>
            <option>ns-resize</option>
            <option>nesw-resize</option>
            <option>nwse-resize</option>
            <option>zoom-in</option>
            <option>zoom-out</option>
          </select>
        </div>
      </div>

      <div id="button-code">
        <div id="button-html" className="code-container">
          {generateHTML()}
        </div>

        <div id="button-css" className="code-container">
          {generateCSS()}
        </div>
      </div>
    </>
  )
}

export default ButtonDesigner;