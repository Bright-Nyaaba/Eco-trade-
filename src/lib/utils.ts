import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount);
}

export function calculateCarbonSavings(kg: number) {
  // Simple estimation: 1.5kg CO2 saved per 1kg plastic recycled
  return kg * 1.5;
}

export function getLevel(points: number) {
  return Math.floor(points / 100) + 1;
}
