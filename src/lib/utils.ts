import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

export const setCssVariable = (name: string, value: string) => {
  document.documentElement.style.setProperty(name, value);
};
