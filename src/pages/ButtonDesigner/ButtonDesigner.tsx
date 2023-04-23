import { ChangeEvent, useState } from 'react';
import './ButtonDesigner.css'

function ButtonDesigner() {
  const [text, setText] = useState('Design your own button!');
  const [background, setBackground] = useState({
    selected: 'color',
    color: { color: '#000000' },
    linearGradient: { colors: ['#000000', '#ffffff'] }
  });
  const [color, setColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState({
    value: 16,
    unit: 'px'
  });
  const [borderRadius, setBorderRadius] = useState({
    value: 8,
    unit: 'px'
  });

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
              borderRadius: `${borderRadius.value + borderRadius.unit}`
            }
          }
        >
          {text}
        </button>
      </div>

      <div id="button-options">
        <div id="text-container">
          <label htmlFor="text" className="option-name">text</label>
          <input id="text" type="text" defaultValue={text} onChange={(event) => setText(event.target.value)}></input>
        </div>

        <div id="background-container">
          <label htmlFor="background-type" className="option-name">background</label>
          <select id="background-type" value={background.selected} onChange={(event) => setBackground({ ...background, selected: event.target.value })}>
            <option>color</option>
            <option>linear-gradient</option>
          </select>
  
          {
            background.selected == 'color' &&
              <input type="color" value={background.color.color} onChange={(event) => setBackground({ ...background, color: { color: event.target.value } })} />
          }
          {
            background.selected == 'linear-gradient' &&
              <>
                <input type="color" value={background.linearGradient.colors[0]} onChange={(event) => handleLinearGradientBackgroundChanged(event, 0)} />
                <input type="color" value={background.linearGradient.colors[1]} onChange={(event) => handleLinearGradientBackgroundChanged(event, 1)} />
              </>
          }
        </div>

        <div id="color-container">
          <label htmlFor="color" className="option-name">color</label>
          <input id="color" type="color" defaultValue={color} onChange={(event) => setColor(event.target.value)}></input>
        </div>

        <div id="font-size-container">
          <label htmlFor="font-size" className="option-name">font-size</label>
          <input id="font-size" type="number" defaultValue={fontSize.value} onChange={(event) => setFontSize({ ...fontSize, value: Number(event.target.value) })}></input>
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
          <input id="border-radius" type="number" defaultValue={borderRadius.value} onChange={(event) => setBorderRadius({ ...borderRadius, value: Number(event.target.value) })}></input>
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