export const getEnumValues = <T extends number | string>(enumObject: { [key: number]: T }): T[] => {
  return Object.values(enumObject);
}

export const toPascalCase = (text: string): string => {
  return text.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')).replace(/^\w/, c => c.toUpperCase());
}

export const toCamelCase = (text: string): string => {
  return text.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
}
