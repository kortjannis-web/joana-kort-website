import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const eur = (n: number) => Math.round(n).toLocaleString('de-DE') + ' €'
export const num = (n: number) => n.toLocaleString('de-DE')
