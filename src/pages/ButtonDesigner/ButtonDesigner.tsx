import { ChangeEvent, useState } from 'react';
import './ButtonDesigner.css'

function ButtonDesigner() {
  const [text, setText] = useState('Design your own button!');
  const [backgroundType, setBackgroundType] = useState('color');
  const [background, setBackground] = useState({
    color: { color: '#000000' },
    linearGradient: { colors: ['#000000', '#ffffff'] }
  });
  const [color, setColor] = useState('#ffffff');
  const [fontSizeUnit, setFontSizeUnit] = useState('px');
  const [fontSize, setFontSize] = useState(16);

  const handleLinearGradientBackgroundChanged = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
    const colors = background.linearGradient.colors;
    colors[index] = event.target.value;
    setBackground({ ...background, linearGradient: { colors: colors } });
  }

  const getBackground = (): string => {
    switch (backgroundType) {
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
        font-size: ${fontSize + fontSizeUnit}
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
              fontSize: `${fontSize + fontSizeUnit}`
            }
          }
        >
          {text}
        </button>
      </div>

      <div id="button-options">
        <div id="text">
          <label htmlFor="text" className="option-name">text</label>
          <input id="text" type="text" defaultValue={text} onChange={(event) => setText(event.target.value)}></input>
        </div>

        <div id="background">
          <label htmlFor="background-type" className="option-name">background</label>
          <select id="background-type" value={backgroundType} onChange={(event) => setBackgroundType(event.target.value)}>
            <option>color</option>
            <option>linear-gradient</option>
          </select>
  
          {
            backgroundType == 'color' &&
              <input type="color" value={background.color.color} onChange={(event) => setBackground({ ...background, color: { color: event.target.value } })} />
          }
          {
            backgroundType == 'linear-gradient' &&
              <>
                <input type="color" value={background.linearGradient.colors[0]} onChange={(event) => handleLinearGradientBackgroundChanged(event, 0)} />
                <input type="color" value={background.linearGradient.colors[1]} onChange={(event) => handleLinearGradientBackgroundChanged(event, 1)} />
              </>
          }
        </div>

        <div id="color">
          <label htmlFor="color" className="option-name">color</label>
          <input id="color" type="color" defaultValue={color} onChange={(event) => setColor(event.target.value)}></input>
        </div>

        <div id="font-size">
          <label htmlFor="font-size" className="option-name">font-size</label>
          <input id="font-size" type="number" defaultValue={fontSize} onChange={(event) => setFontSize(Number(event.target.value))}></input>
          <select id="font-size-unit" value={fontSizeUnit} onChange={(event) => setFontSizeUnit(event.target.value)}>
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