export const toCamelCase = (text: string): string => {
  return text.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
}
