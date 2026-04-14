import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { TransactionsContext, type TransactionsState } from './TransactionsContext';
import { CARD_LIMIT } from '../constants/app';
import { parseTransactions } from '../utils/validate';

interface ProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: ProviderProps): React.JSX.Element {
  const [state, setState] = useState<TransactionsState>(() => ({
    transactions: [],
    loading: true,
    error: null,
    balance: Math.floor(Math.random() * CARD_LIMIT * 100) / 100,
  }));

  useEffect(() => {
    let cancelled = false;

    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load transactions: ${res.status}`);
        return res.json() as Promise<unknown>;
      })
      .then((raw) => {
        const data = parseTransactions(raw);
        if (!cancelled) {
          setState((prev) => ({ ...prev, transactions: data, loading: false, error: null }));
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            transactions: [],
            loading: false,
            error: err instanceof Error ? err : new Error(String(err)),
          }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <TransactionsContext.Provider value={state}>
      {children}
    </TransactionsContext.Provider>
  );
}
