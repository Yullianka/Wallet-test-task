import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Transaction } from '../types';
import { TransactionsContext, type TransactionsState } from './TransactionsContext';

interface ProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: ProviderProps): React.JSX.Element {
  const [state, setState] = useState<TransactionsState>({
    transactions: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load transactions: ${res.status}`);
        return res.json() as Promise<Transaction[]>;
      })
      .then((data) => {
        if (!cancelled) {
          setState({ transactions: data, loading: false, error: null });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            transactions: [],
            loading: false,
            error: err instanceof Error ? err : new Error(String(err)),
          });
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
