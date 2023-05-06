import { ChangeEvent, useState } from 'react';
import './ButtonDesigner.css'
import { Background, Border, BorderRadius, FontSize, Padding } from './button-designer-types';
import Input from '../../components/Input/Input'
import { InputType } from '../../components/Input/input-types';
import UnitSelect from '../../components/UnitSelect/UnitSelect';

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
        font-weight: ${fontWeight};
        border: ${border.width.value + border.width.unit} ${border.style} ${border.color};
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
          <select id="font-weight" value={fontWeight} onChange={(event) => setFontWeight(event.target.value)}>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
        </div>

        <div id="border-container">
          <label htmlFor="border" className="option-name">border</label>
          <UnitSelect
            value={border.width.value}
            unit={border.width.unit} 
            valueOnChange={(event) => setBorder({ ...border, width: { ...border.width, value: Number(event.target.value) } })}
            unitOnChange={(event) => setBorder({ ...border, width: { ...border.width, unit: event.target.value } })}
          />
          <select value={border.style} onChange={(event) => setBorder({ ...border, style: event.target.value })} >
            <option value="none">none</option>
            <option value="hidden">hidden</option>
            <option value="dotted">dotted</option>
            <option value="dashed">dashed</option>
            <option value="solid">solid</option>
            <option value="double">double</option>
            <option value="groove">groove</option>
            <option value="ridge">ridge</option>
            <option value="inset">inset</option>
            <option value="outset">outset</option>
          </select>
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
          <select id="cursor" value={cursor} onChange={(event) => setCursor(event.target.value)}>
            <option value="auto">auto</option>
            <option value="default">default</option>
            <option value="none">none</option>
            <option value="context-menu">context-menu</option>
            <option value="help">help</option>
            <option value="pointer">pointer</option>
            <option value="progress">progress</option>
            <option value="wait">wait</option>
            <option value="cell">cell</option>
            <option value="crosshair">crosshair</option>
            <option value="text">text</option>
            <option value="vertical-text">vertical-text</option>
            <option value="alias">alias</option>
            <option value="copy">copy</option>
            <option value="move">move</option>
            <option value="no-drop">no-drop</option>
            <option value="not-allowed">not-allowed</option>
            <option value="grab">grab</option>
            <option value="grabbing">grabbing</option>
            <option value="all-scroll">all-scroll</option>
            <option value="col-resize">col-resize</option>
            <option value="row-resize">row-resize</option>
            <option value="n-resize">n-resize</option>
            <option value="e-resize">e-resize</option>
            <option value="s-resize">s-resize</option>
            <option value="w-resize">w-resize</option>
            <option value="ne-resize">ne-resize</option>
            <option value="nw-resize">nw-resize</option>
            <option value="se-resize">se-resize</option>
            <option value="sw-resize">sw-resize</option>
            <option value="ew-resize">ew-resize</option>
            <option value="ns-resize">ns-resize</option>
            <option value="nesw-resize">nesw-resize</option>
            <option value="nwse-resize">nwse-resize</option>
            <option value="zoom-in">zoom-in</option>
            <option value="zoom-out">zoom-out</option>
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