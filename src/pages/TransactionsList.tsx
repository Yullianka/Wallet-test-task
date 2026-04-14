import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TransactionItem } from '../components/TransactionItem';
import { calculateDailyPoints, formatPoints } from '../utils/points';
import { formatCurrency } from '../utils/date';
import { useTransactions } from '../hooks/useTransactions';
import { CARD_LIMIT, MAX_TRANSACTIONS } from '../constants/app';
import styles from './TransactionsList.module.css';

export const TransactionsList = (): React.JSX.Element => {
  const { transactions, loading, error, balance } = useTransactions();

  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
  const available = CARD_LIMIT - balance;
  const points = calculateDailyPoints(new Date());
  const latestTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, MAX_TRANSACTIONS),
    [transactions],
  );

  return (
    <div className={styles.page}>
      <div className={styles.topGrid}>
        <div className={styles.cardsColumn}>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Card Balance</div>
            <div className={styles.balanceAmount}>${formatCurrency(balance)}</div>
            <div className={styles.subText}>
              ${formatCurrency(available)} Available
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardLabel}>Daily Points</div>
            <div className={styles.pointsValue}>{formatPoints(points)}</div>
          </div>
        </div>

        <div className={styles.noPaymentCard}>
          <div>
            <div className={styles.noPaymentLabel}>No Payment Due</div>
            <div className={styles.noPaymentDesc}>
              You've paid your {month} balance.
            </div>
          </div>
          <div className={styles.checkCircle}>
            <FontAwesomeIcon icon={faCheck} size="xl" />
          </div>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Latest Transactions</h2>
      <div className={styles.listContainer}>
        {loading && <div>Loading transactions...</div>}
        {error && <div>Failed to load transactions.</div>}
        {!loading && !error && latestTransactions.map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
};
