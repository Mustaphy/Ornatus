import { ChangeEvent, useState } from 'react';
import './ElementDesigner.css';
import { Background, Border, BorderRadius, FontSize, Height, Padding, Value, Width } from './ElementDesignerInterfaces';
import { BackgroundProperty, BorderStyle, CursorKeyword, ElementSelector, backgroundProperties, borderStyles, cursorKeywords, elementSelectors } from './ElementDesignerTypes';
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
  });
  const [height, setHeight] = useState<Height>({
    value: 100,
    unit: '%'
  });
  const [width, setWidth] = useState<Width>({
    value: 160,
    unit: 'px'
  });
  const [background, setBackground] = useState<Background>({
    selected: 'color',
    color: { color: '#000000' },
    linearGradient: { colors: ['#000000', '#ffffff'] }
  });
  const [color, setColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState<FontSize>({
    value: 16,
    unit: 'px'
  });
  const [fontWeight, setFontWeight] = useState('400');
  const [border, setBorder] = useState<Border>({
    width: { value: 1, unit: 'px' },
    style: 'solid',
    color: '#ffffff'
  });
  const [borderRadius, setBorderRadius] = useState<BorderRadius>({
    value: 8,
    unit: 'px'
  });
  const [padding, setPadding] = useState<Padding>({
    value: 8,
    unit: 'px'
  });
  const [cursor, setCursor] = useState<CursorKeyword>('pointer');

  const handleLinearGradientBackgroundChanged = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
    const colors = background.linearGradient.colors;
    colors[index] = event.target.value;
    setBackground({ ...background, linearGradient: { colors: colors } });
  }

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

  const getCurrentValue = (): string => {
    const formattedType = toCamelCase(type) as keyof typeof value;
    return value[formattedType];
  }

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

  const isTypeVisible = (): boolean => {
    return element == 'input' || element == 'button';
  }

  const isInnerTextVisible = (): boolean => {
    return element !== 'input' && element !== 'textarea';
  }

  const isValueVisible = (): boolean => {
    return element === 'input' || element === 'textarea';
  }

  const currentSelectionHasText = (): boolean => {
    return element !== 'input' || type !== 'color';
  }

  const generateHTML = (): string => {
    switch (element) {
      case 'input':
      case 'textarea':
        return `<${element}\n` +
               `  id="styleface-${element}"\n` +
               (isTypeVisible() ? `  type="${type}"\n` : '') +
               `  value="${value.text}"\n` +
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

  const generateCSS = (): string => {
    return (
      `#styleface-${element} {\n` +
      `  height: ${height.value + height.unit};\n` +
      `  width: ${width.value + width.unit};\n` +
      `  background: ${getCurrentBackground()};\n` +
      (currentSelectionHasText() ? `  color: ${color};\n` : '') +
      (currentSelectionHasText() ? `  font-size: ${fontSize.value + fontSize.unit};\n` : '')  +
      (currentSelectionHasText() ? `  font-weight: ${fontWeight};\n` : '') +
      `  border: ${border.width.value + border.width.unit} ${border.style} ${border.color};\n` +
      `  border-radius: ${borderRadius.value + borderRadius.unit};\n` +
      `  padding: ${padding.value + padding.unit};\n` +
      `  cursor: ${cursor};\n` +
      `}`
    );
  }

  return (
    <div id="element-designer">
      <div id="element-preview">
        <PreviewElement
          element={element}
          innerText={innerText}
          value={value}
          inputType={type}
          style={
            {
              height: `${height.value + height.unit}`,
              width: `${width.value + width.unit}`,
              background: getCurrentBackground(),
              color: color,
              fontSize: `${fontSize.value + fontSize.unit}`,
              fontWeight: fontWeight,
              border: `${border.width.value + border.width.unit} ${border.style} ${border.color}`,
              borderRadius: `${borderRadius.value + borderRadius.unit}`,
              padding: `${padding.value + padding.unit}`,
              cursor: cursor,
            }
          } />
      </div>

      <div id="styling-options">
        <div>
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
            <div>
              <label htmlFor="value" className="option-name">value</label>
              <Input
                id="value"
                type={element === 'input' ? getCurrentType() : 'text'}
                value={element === 'input' ? getCurrentValue() : value.text}
                onChange={
                  (event) => setValue((previousValue) => ({
                    ...previousValue,
                    [element === 'input' ? type : 'text']: event.target.value,
                  }))
                }
              />
            </div>
        }

        <div>
          <label htmlFor="height" className="option-name">height</label>
          <UnitSelect
            id="height"
            value={height.value}
            unit={height.unit} 
            valueOnChange={(event) => setHeight({ ...height, value: Number(event.target.value) })}
            unitOnChange={(event) => setHeight({ ...height, unit: event.target.value as Unit })}
          />
        </div>

        <div>
          <label htmlFor="width" className="option-name">width</label>
          <UnitSelect
            id="width"
            value={width.value}
            unit={width.unit} 
            valueOnChange={(event) => setWidth({ ...width, value: Number(event.target.value) })}
            unitOnChange={(event) => setWidth({ ...width, unit: event.target.value as Unit })}
          />
        </div>

        <div>
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
            <div>
              <label htmlFor="color" className="option-name">color</label>
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
            </div>
        }

        {
          currentSelectionHasText() &&
            <div>
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
            <div>
              <label htmlFor="font-weight" className="option-name">font-weight</label>
              <Input
                id="font-weight"
                type="number"
                value={fontWeight}
                min={100}
                max={900}
                step={100}
                onChange={(event) => setFontWeight(event.target.value)}
              />
            </div>
        }

        <div>
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

        <div>
          <label htmlFor="border-radius" className="option-name">border-radius</label>
          <UnitSelect
            id="border-radius"
            value={borderRadius.value}
            unit={borderRadius.unit} 
            valueOnChange={(event) => setBorderRadius({ ...borderRadius, value: Number(event.target.value) })}
            unitOnChange={(event) => setBorderRadius({ ...borderRadius, unit: event.target.value as Unit })}
          />
        </div>

        <div>
          <label htmlFor="padding" className="option-name">padding</label>
          <UnitSelect
            id="padding"
            value={padding.value}
            unit={padding.unit} 
            valueOnChange={(event) => setPadding({ ...padding, value: Number(event.target.value) })}
            unitOnChange={(event) => setPadding({ ...padding, unit: event.target.value as Unit })}
          />
        </div>

        <div>
          <label htmlFor="cursor" className="option-name">cursor</label>
          <Select
            id="cursor"
            value={cursor}
            options={cursorKeywords.slice()}
            onChange={(event) => setCursor(event.target.value as CursorKeyword)} 
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