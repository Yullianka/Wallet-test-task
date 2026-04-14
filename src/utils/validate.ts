import type { Transaction, TransactionType } from '../types';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function isTransactionType(v: unknown): v is TransactionType {
  return v === 'Payment' || v === 'Credit';
}

function isIconType(v: unknown): v is 'solid' | 'brand' {
  return v === 'solid' || v === 'brand';
}

export function parseTransactions(input: unknown): Transaction[] {
  if (!Array.isArray(input)) throw new Error('Expected array of transactions');
  return input.map((item, i) => {
    if (!isRecord(item)) throw new Error(`Transaction ${i}: not an object`);
    const {
      id, type, amount, name, description, date, pending,
      authorizedUser, icon, iconType, cashbackPercent, cardName,
    } = item;

    if (typeof id !== 'string') throw new Error(`Transaction ${i}: invalid id`);
    if (!isTransactionType(type)) throw new Error(`Transaction ${i}: invalid type`);
    if (typeof amount !== 'number' || !Number.isFinite(amount)) throw new Error(`Transaction ${i}: invalid amount`);
    if (typeof name !== 'string') throw new Error(`Transaction ${i}: invalid name`);
    if (typeof description !== 'string') throw new Error(`Transaction ${i}: invalid description`);
    if (typeof date !== 'string' || Number.isNaN(Date.parse(date))) throw new Error(`Transaction ${i}: invalid date`);
    if (typeof pending !== 'boolean') throw new Error(`Transaction ${i}: invalid pending`);
    if (typeof icon !== 'string') throw new Error(`Transaction ${i}: invalid icon`);
    if (!isIconType(iconType)) throw new Error(`Transaction ${i}: invalid iconType`);
    if (authorizedUser !== undefined && typeof authorizedUser !== 'string') throw new Error(`Transaction ${i}: invalid authorizedUser`);
    if (cashbackPercent !== undefined && typeof cashbackPercent !== 'number') throw new Error(`Transaction ${i}: invalid cashbackPercent`);
    if (cardName !== undefined && typeof cardName !== 'string') throw new Error(`Transaction ${i}: invalid cardName`);

    return {
      id, type, amount, name, description, date, pending,
      icon, iconType, authorizedUser, cashbackPercent, cardName,
    };
  });
}
