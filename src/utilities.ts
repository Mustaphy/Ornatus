export const toCamelCase = (text: string): string => {
  return text.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
}

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as unknown as T;
}

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const generateId = (staticText: string): string => {
  return `${staticText}-${getRandomNumberString(4)}`;
}

const getRandomNumberString = (length: number): string => {
  const min = Math.pow(10, length - 1); // Minimum value based on the length
  const max = Math.pow(10, length) - 1; // Maximum value based on the length
  const randomNumber = Math.floor(min + Math.random() * (max - min + 1)); // Generate a random number within the range
  return randomNumber.toString(); // Convert the number to a string
};
