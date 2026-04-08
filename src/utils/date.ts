import type { Transaction } from '../types';
import { WEEKDAYS, MS_PER_DAY } from '../constants/app';


function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatTransactionDate(dateStr: string): string {
  const date = new Date(dateStr);
  const diffDays = Math.round((startOfDay(new Date()).getTime() - startOfDay(date).getTime()) / MS_PER_DAY);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) return WEEKDAYS[date.getDay()];

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
  return amount.toFixed(2);
}

export function formatTransactionAmount(transaction: Transaction): string {
  const prefix = transaction.type === 'Payment' ? '+$' : '$';
  return `${prefix}${formatCurrency(transaction.amount)}`;
}
