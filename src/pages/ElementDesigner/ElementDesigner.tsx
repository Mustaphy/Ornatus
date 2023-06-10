import { ChangeEvent, useState } from 'react';
import './ElementDesigner.css';
import { BackgroundProperty, BorderStyle, CursorKeyword, ElementSelector, Option, backgroundProperties, borderStyles, cursorKeywords, elementSelectors, options, Background, Border, BorderRadius, FontSize, Height, Padding, Value, Width, Color, Cursor, FontWeight } from './ElementDesignerTypes';
import Input from '../../components/Input/Input'
import UnitSelect from '../../components/UnitSelect/UnitSelect';
import Select from "../../components/Select/Select";
import { MdContentCopy } from "react-icons/all";
import PreviewElement from '../../components/PreviewElement/PreviewElement';
import { toCamelCase } from '../../utilities';
import { Type as Type, types } from '../../components/Input/InputTypes';
import { Unit } from '../../components/UnitSelect/UnitSelectTypes';

function ElementDesigner() {
  const [element, setElement] = useState<ElementSelector>('button');
  const [type, setType] = useState<Type>('text');
  const [innerText, setInnerText] = useState('Design your own element!');
  const [value, setValue] = useState<Value>({
    button: 'Click here!',
    color: '#000000',
    checkbox: 'false',
    date: '2023-01-01',
    datetimeLocal: '2023-01-01T00:00',
    email: 'example@domain.com',
    month: 'January',
    number: '2023',
    password: 'admin',
    reset: 'Reset',
    search: 'Search',
    submit: 'Submit',
    tel: '+31 12 3456789',
    text: 'Text',
    time: "00:00",
    url: 'https://example.com',
    week: '1',
    active: true,
  });
  const [height, setHeight] = useState<Height>({
    value: 100,
    unit: '%',
    active: false,
  });
  const [width, setWidth] = useState<Width>({
    value: 160,
    unit: 'px',
    active: false,
  });
  const [background, setBackground] = useState<Background>({
    selected: 'color',
    color: { color: '#000000' },
    linearGradient: { colors: ['#000000', '#ffffff'] },
    active: true,
  });
  const [color, setColor] = useState<Color>({
    hex: '#ffffff',
    active: true,
  });
  const [fontSize, setFontSize] = useState<FontSize>({
    value: 16,
    unit: 'px',
    active: true,
  });
  const [fontWeight, setFontWeight] = useState<FontWeight>({
    value: 400,
    active: true,
  });
  const [border, setBorder] = useState<Border>({
    width: { value: 1, unit: 'px' },
    style: 'solid',
    color: '#ffffff',
    active: true,
  });
  const [borderRadius, setBorderRadius] = useState<BorderRadius>({
    value: 8,
    unit: 'px',
    active: true,
  });
  const [padding, setPadding] = useState<Padding>({
    value: 8,
    unit: 'px',
    active: true,
  });
  const [cursor, setCursor] = useState<Cursor>({
    keyword: 'pointer',
    active: true,
  });

  /**
   * Change the linear-gradient background when the selected colors are changed
   * @param {ChangeEvent<HTMLInputElement>} event Event that fires when the selected colors are changed
   * @param {number} index The index of the color that is changed, since the linear-gradient consists of mulitple colors
   */
  const handleLinearGradientBackgroundChanged = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
    const colors = background.linearGradient.colors;
    colors[index] = event.target.value;
    setBackground({ ...background, linearGradient: { colors: colors } });
  }

  /**
   * Get the value of the background property based on the current state
   * @returns {string} Returns the string that is used for the background property in the CSS
   */
  const getCurrentBackground = (): string => {
    switch (background.selected) {
      case 'color':
        return background.color.color;
      case 'linear-gradient':
        return `linear-gradient(${background.linearGradient.colors[0]}, ${background.linearGradient.colors[1]})`;
      default:
        return '';
    }
  }

  /**
   * Get the input type that should be used to input the value attribute
   * @returns {Type} Returns which type the input field is used for the value input
   */
  const getCurrentType = (): Type => {
    switch (type) {
      case 'button':
      case 'email':
      case 'password':
      case 'reset':
      case 'search':
        return 'text';
      default:
        return type;
    }
  }

  /**
   * Get the value that is used currently, based on the selected input type (e.g. text, number)
   * @returns {string} Returns the current value based on the selected input type
   */
  const getCurrentValue = (): string | boolean => {
    const formattedType = toCamelCase(type) as keyof typeof value;
    return value[formattedType];
  }

  /**
   * Get the type options that are available for the selected element
   * @returns {Type[]} Returns which input types are available for the selected element
   */
  const getTypeOptions = (): Type[] => {
    switch (element) {
      case 'button':
        return ['button', 'reset', 'submit'];
      case 'input':
        return types.slice();
      default:
        return [];
    }
  }

  /**
   * Get if the 'type' option is visible for the user based on the selected element
   * @returns {boolean} Returns if the type option is visible for the user
   */
  const isTypeVisible = (): boolean => {
    return element == 'input' || element == 'button';
  }

  /**
   * Get if the 'innerText' option is visible for the user based on the selected element
   * @returns {boolean} Returns if the 'innerText' option is visible for the user
   */
  const isInnerTextVisible = (): boolean => {
    return element !== 'input' && element !== 'textarea';
  }

  /**
   * Get if the 'value' option is visible for the user based on the selected element
   * @returns {boolean} Returns if the 'value' option is visible for the user
   */
  const isValueVisible = (): boolean => {
    return element === 'input' || element === 'textarea';
  }

  /**
   * Get if the current state of the element has text on it
   * @returns {boolean} Returns if the current state of the element has text on it
   */
  const currentSelectionHasText = (): boolean => {
    return element !== 'input' || (type !== 'color' && type !== 'checkbox');
  }

  /**
   * Get a string of valid HTML of the current state of the element
   * @returns {string} Returns a string of valid HTML of the current state of the element
   */
  const generateHTML = (): string => {
    switch (element) {
      case 'input':
      case 'textarea':
        return `<${element}\n` +
               `  id="styleface-${element}"\n` +
               (isTypeVisible() ? `  type="${type}"\n` : '') +
               (value.active ? `  value="${type}"\n` : '') +
               `/>`;
      default:
        return `<${element}\n` +
               `  id="styleface-${element}"\n` +
               (isTypeVisible() ? `  type="${type}"\n` : '') +
               `>\n` +
               `  ${innerText}\n` +
               `</${element}>`;
    }
  }

  /**
   * Get a string of valid CSS of the current state of the element
   * @returns {string} Returns a string of valid CSS of the current state of the element
   */
  const generateCSS = (): string => {
    const styles = [
      { condition: height.active, style: `height: ${height.value + height.unit};` },
      { condition: width.active, style: `width: ${width.value + width.unit};` },
      { condition: background.active, style: `background: ${getCurrentBackground()};` },
      { condition: color.active && currentSelectionHasText(), style: `color: ${color.hex};` },
      { condition: fontSize.active && currentSelectionHasText(), style: `font-size: ${fontSize.value + fontSize.unit};` },
      { condition: fontWeight.active && currentSelectionHasText(), style: `font-weight: ${fontWeight.value};` },
      { condition: border.active, style: `border: ${border.width.value + border.width.unit} ${border.style} ${border.color};` },
      { condition: borderRadius.active, style: `border-radius: ${borderRadius.value + borderRadius.unit};` },
      { condition: padding.active, style: `padding: ${padding.value + padding.unit};` },
      { condition: cursor.active, style: `cursor: ${cursor.keyword};` },
    ];
    
    return `#styleface-${element} {\n` +
           `  ${styles.filter(line => line.condition).map(line => line.style).join('\n  ')}\n` +
           `}`;
  }

  return (
    <div id="element-designer">
      <div id="element-preview">
        <PreviewElement
          element={element}
          innerText={innerText}
          value={value}
          type={type}
          checked={value.checkbox}
          style={
            {
              height: height.active ? `${height.value + height.unit}` : '',
              width: width.active ? `${width.value + width.unit}` : '',
              background: background.active ? getCurrentBackground() : '',
              color: color.active ? color.hex : '',
              fontSize: fontSize.active ? `${fontSize.value + fontSize.unit}` : '',
              fontWeight: fontWeight.active ? fontWeight.value : '',
              border: border.active ? `${border.width.value + border.width.unit} ${border.style} ${border.color}` : '',
              borderRadius: borderRadius.active ? `${borderRadius.value + borderRadius.unit}` : '',
              padding: padding.active ? `${padding.value + padding.unit}` : '',
              cursor: cursor.active ? cursor.keyword : '',
            }
          } />
      </div>

      <div id="styling-options">
        <div>
          <Input type="checkbox" checked disabled />

          <label htmlFor="element" className="option-name">element</label>
          <Select
            id="element"
            value={element}
            options={elementSelectors.slice()}
            onChange={(event) => setElement(event.target.value as ElementSelector)}
          />
        </div>

        {
          isTypeVisible() &&
            <div>
              <Input type="checkbox" checked disabled />

              <label htmlFor="type" className="option-name">type</label>
              <Select
                id="type"
                value={type}
                options={getTypeOptions()}
                onChange={
                  (event) => setType(event.target.value as Type)
                }
              />
            </div>
        }

        {
          isInnerTextVisible() &&
            <div>
              <Input type="checkbox" checked disabled />

              <label htmlFor="innerText" className="option-name">innerText</label>
              <Input
                id="innerText"
                type="text"
                value={innerText}
                onChange={(event) => setInnerText(event.target.value)}
              />
            </div>
        }

        {
          isValueVisible() &&
            <div className={!value.active ? 'hidden' : ''}>
              <Input type="checkbox" checked={value.active} disabled />

              <label htmlFor="value" className="option-name">value</label>
              <Input
                id="value"
                type={element === 'input' ? getCurrentType() : 'text'}
                value={element === 'input' ? getCurrentValue() : value.text}
                onChange={
                  (event) => setValue((previousValue: Value) => ({
                    ...previousValue,
                    [element === 'input' ? type : 'text']:
                      element === 'input' && type === 'checkbox' ? event.target.checked : event.target.value,
                  }))
                }
              />
            </div>
        }

        <div className={!height.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={height.active} onChange={(() => setHeight({ ...height, active: !height.active }))} />

          <label htmlFor="height" className="option-name">height</label>
          <UnitSelect
            id="height"
            value={height.value}
            unit={height.unit} 
            valueOnChange={(event) => setHeight({ ...height, value: Number(event.target.value) })}
            unitOnChange={(event) => setHeight({ ...height, unit: event.target.value as Unit })}
          />
        </div>

        <div className={!width.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={width.active} onChange={(() => setWidth({ ...width, active: !width.active }))} />

          <label htmlFor="width" className="option-name">width</label>
          <UnitSelect
            id="width"
            value={width.value}
            unit={width.unit} 
            valueOnChange={(event) => setWidth({ ...width, value: Number(event.target.value) })}
            unitOnChange={(event) => setWidth({ ...width, unit: event.target.value as Unit })}
          />
        </div>

        <div className={!background.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={background.active} onChange={(() => setBackground({ ...background, active: !background.active }))} />

          <label htmlFor="background-property" className="option-name">background</label>
          <Select
            id="background-property"
            value={background.selected}
            options={backgroundProperties.slice()}
            onChange={(event) => setBackground({ ...background, selected: event.target.value as BackgroundProperty})}
          />
  
          {
            background.selected == 'color' &&
              <Input
                type="color"
                value={background.color.color}
                onChange={(event) => setBackground({ ...background, color: { color: event.target.value } })}
              />
          }
          {
            background.selected == 'linear-gradient' &&
              <>
                <Input
                  type="color"
                  value={background.linearGradient.colors[0]}
                  onChange={(event) => handleLinearGradientBackgroundChanged(event, 0)}
                />
                <Input
                  type="color"
                  value={background.linearGradient.colors[1]}
                  onChange={(event) => handleLinearGradientBackgroundChanged(event, 1)}
                />
              </>
          }
        </div>

        {
          currentSelectionHasText() &&
            <div className={!color.active ? 'hidden' : ''}>
              <Input type="checkbox" checked={color.active} onChange={(() => setColor({ ...color, active: !color.active }))} />

              <label htmlFor="color" className="option-name">color</label>
              <Input
                id="color"
                type="color"
                value={color.hex}
                onChange={(event) => setColor({ ...color, hex: event.target.value })}
              />
            </div>
        }

        {
          currentSelectionHasText() &&
          <div className={!fontSize.active ? 'hidden' : ''}>
              <Input type="checkbox" checked={fontSize.active} onChange={(() => setFontSize({ ...fontSize, active: !fontSize.active }))} />

              <label htmlFor="font-size" className="option-name">font-size</label>
              <UnitSelect
                id="font-size"
                value={fontSize.value}
                unit={fontSize.unit} 
                valueOnChange={(event) => setFontSize({ ...fontSize, value: Number(event.target.value) })}
                unitOnChange={(event) => setFontSize({ ...fontSize, unit: event.target.value as Unit })}
              />
            </div>
        }

        {
          currentSelectionHasText() &&
            <div className={!fontWeight.active ? 'hidden' : ''}>
              <Input type="checkbox" checked={fontWeight.active} onChange={(() => setFontWeight({ ...fontWeight, active: !fontWeight.active }))} />

              <label htmlFor="font-weight" className="option-name">font-weight</label>
              <Input
                id="font-weight"
                type="number"
                value={fontWeight.value}
                min={100}
                max={900}
                step={100}
                onChange={(event) => setFontWeight({ ...fontWeight, value: Number(event.target.value)})}
              />
            </div>
        }

        <div className={!border.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={border.active} onChange={(() => setBorder({ ...border, active: !border.active }))} />

          <label htmlFor="border" className="option-name">border</label>
          <UnitSelect
            value={border.width.value}
            unit={border.width.unit} 
            valueOnChange={(event) => setBorder({ ...border, width: { ...border.width, value: Number(event.target.value) } })}
            unitOnChange={(event) => setBorder({ ...border, width: { ...border.width, unit: event.target.value as Unit } })}
          />
          <Select
            value={border.style}
            options={borderStyles.slice()}
            onChange={(event) => setBorder({ ...border, style: event.target.value as BorderStyle })}
          />
          <Input
            type="color"
            value={border.color}
            onChange={(event) => setBorder({ ...border, color: event.target.value })}
          />
        </div>

        <div className={!borderRadius.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={borderRadius.active} onChange={(() => setBorderRadius({ ...borderRadius, active: !borderRadius.active }))} />

          <label htmlFor="border-radius" className="option-name">border-radius</label>
          <UnitSelect
            id="border-radius"
            value={borderRadius.value}
            unit={borderRadius.unit} 
            valueOnChange={(event) => setBorderRadius({ ...borderRadius, value: Number(event.target.value) })}
            unitOnChange={(event) => setBorderRadius({ ...borderRadius, unit: event.target.value as Unit })}
          />
        </div>

        <div className={!padding.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={padding.active} onChange={(() => setPadding({ ...padding, active: !padding.active }))} />

          <label htmlFor="padding" className="option-name">padding</label>
          <UnitSelect
            id="padding"
            value={padding.value}
            unit={padding.unit} 
            valueOnChange={(event) => setPadding({ ...padding, value: Number(event.target.value) })}
            unitOnChange={(event) => setPadding({ ...padding, unit: event.target.value as Unit })}
          />
        </div>

        <div className={!cursor.active ? 'hidden' : ''}>
          <Input type="checkbox" checked={cursor.active} onChange={(() => setCursor({ ...cursor, active: !cursor.active }))} />

          <label htmlFor="cursor" className="option-name">cursor</label>
          <Select
            id="cursor"
            value={cursor.keyword}
            options={cursorKeywords.slice()}
            onChange={(event) => setCursor({ ...cursor, keyword: event.target.value as CursorKeyword })} 
          />
        </div>
      </div>

      <div id="element-code">
        <pre id="button-html" className="code-container">
          {generateHTML()}
          <MdContentCopy className="copy-button" onClick={() => navigator.clipboard.writeText(generateHTML())} />
        </pre>

        <pre id="button-css" className="code-container">
          {generateCSS()}
          <MdContentCopy className="copy-button" onClick={() => navigator.clipboard.writeText(generateCSS())} />
        </pre>
      </div>
    </div>
  )
}

export default ElementDesigner;