import { createContext } from 'react';
import type { Transaction } from '../types';

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: Error | null;
}

export const TransactionsContext = createContext<TransactionsState | null>(null);
