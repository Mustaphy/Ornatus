import { ChangeEvent, useState } from 'react';
import './ButtonDesigner.css'

function ButtonDesigner() {
  const [backgroundType, setBackgroundType] = useState('color');
  const [background, setBackground] = useState({ color: '#000000' });

  const handleBackgroundTypeChanged = (event: ChangeEvent<HTMLSelectElement>): void => {
    setBackgroundType(event.target.value);
  }

  const handleBackgroundChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    switch (backgroundType) {
      case 'color':
        setBackground({ color: event.target.value })
        break;
    }
  }

  const generateHTML = (): string => {
    return `
      <button id="styleface-button">
        Example
      </button>
    `;
  }

  const generateCSS = (): string => {
    return `
      #styleface-button {
        background: ${background.color};
      }
    `;
  }

  return (
    <>
      <div id="button-preview">
        <button
          style={
            {
              background: background.color,
            }
          }
        >
          Example
        </button>
      </div>

      <div id="button-options">
        <div id="background">
          <label htmlFor="background-type" className="option-name">background</label>
          <select value={backgroundType} onChange={(event) => handleBackgroundTypeChanged(event)}>
            <option>color</option>
          </select>
  
          {
            backgroundType == 'color' &&
              <input type="color" value={background.color} onChange={(event) => handleBackgroundChanged(event)} />
          }
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