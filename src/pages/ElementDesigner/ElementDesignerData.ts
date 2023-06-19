import { generateId, generateUUID } from "../../helpers/utilities";
import { Element } from "./ElementDesignerTypes";

export const getDefaultElement = (): Element => {
  return {
    uuid: generateUUID(),
    selector: 'div',
    innerText: 'Design your own element!',
    attributes: {
      id: generateId('element'),
      type: 'text',
      value: {
        button: 'Click here!',
        color: '#000000',
        checkbox: false,
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
      },
    },
    properties: {
      display: {
        keyword: 'grid',
        active: false
      },
      gridAutoFlow: {
        keyword: 'row',
        active: false,
      },
      height: {
        value: 100,
        unit: '%',
        active: false,
      },
      width: {
        value: 160,
        unit: 'px',
        active: false,
      },
      background: {
        selected: 'color',
        color: { color: '#000000' },
        linearGradient: { colors: ['#000000', '#ffffff'] },
        active: true,
      },
      color: {
        hex: '#ffffff',
        active: true,
      },
      fontSize: {
        value: 16,
        unit: 'px',
        active: true,
      },
      fontWeight: {
        value: 400,
        active: true,
      },
      textAlign: {
        keyword: 'left',
        active: true,
      },
      border: {
        width: { value: 1, unit: 'px' },
        style: 'solid',
        color: '#ffffff',
        active: true,
      },
      borderRadius: {
        value: 8,
        unit: 'px',
        active: true,
      },
      margin: {
        value: 4,
        unit: 'px',
        active: true,
      },
      padding: {
        value: 4,
        unit: 'px',
        active: true,
      },
      cursor: {
        keyword: 'pointer',
        active: true,
      },
      textTransform: {
        keyword: 'none',
        active: false,
      },
    }
  }
}
