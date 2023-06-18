export const toCamelCase = (text: string): string => {
  return text.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
}

export const toKebabCase = (text: string): string => {
  return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function deepCopy<T>(source: T): T {
  if (source === null || typeof source !== 'object' || source instanceof Function) {
    return source;
  }

  const copy = Array.isArray(source) ? [] : {} as any;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      copy[key as keyof T] = deepCopy(source[key as keyof T]);
    }
  }

  return copy as T;
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
