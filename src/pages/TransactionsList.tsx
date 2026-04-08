import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TransactionItem } from '../components/TransactionItem';
import { calculateDailyPoints, formatPoints } from '../utils/points';
import { useTransactions } from '../hooks/useTransactions';
import { CARD_LIMIT, MAX_TRANSACTIONS } from '../constants/app';
import styles from './TransactionsList.module.css';

export const TransactionsList = (): React.JSX.Element => {
  const { transactions } = useTransactions();
  const [balance] = useState<number>(() => Math.floor(Math.random() * CARD_LIMIT * 100) / 100);

  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
  const available = CARD_LIMIT - balance;
  const points = calculateDailyPoints(new Date());
  const latestTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_TRANSACTIONS);

  return (
    <div className={styles.page}>
      <div className={styles.topGrid}>
        <div className={styles.cardsColumn}>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Card Balance</div>
            <div className={styles.balanceAmount}>${balance.toFixed(2)}</div>
            <div className={styles.subText}>
              ${available.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Available
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
        {latestTransactions.map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
};
