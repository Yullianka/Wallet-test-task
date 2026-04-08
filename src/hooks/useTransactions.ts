import { useContext } from 'react';
import { TransactionsContext, type TransactionsState } from './TransactionsContext';

export function useTransactions(): TransactionsState {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return ctx;
}
