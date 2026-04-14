import type { Transaction } from '../types';
import { WEEKDAYS } from '../constants/app';


function diffCalendarDays(a: Date, b: Date): number {
  const aUtc = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const bUtc = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((aUtc - bUtc) / 86400000);
}

export function formatTransactionDate(dateStr: string): string {
  const date = new Date(dateStr);
  const diffDays = diffCalendarDays(new Date(), date);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays >= 2 && diffDays <= 7) return WEEKDAYS[date.getDay()];

  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = String(date.getFullYear()).slice(-2);
  return `${m}/${d}/${y}`;
}

export function formatDetailDate(dateStr: string): string {
  const date = new Date(dateStr);
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${m}/${d}/${y}, ${hours}:${minutes}`;
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatTransactionAmount(transaction: Transaction): string {
  const prefix = transaction.type === 'Payment' ? '+$' : '$';
  return `${prefix}${formatCurrency(Math.abs(transaction.amount))}`;
}
