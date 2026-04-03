import { useState, useEffect } from 'react';
import type { Transaction } from '../types';
import { TransactionItem } from '../components/TransactionItem';
import { calculateDailyPoints, formatPoints } from '../utils/points';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './TransactionsList.module.css';

export const TransactionsList = (): React.JSX.Element => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance] = useState<number>(() => Math.floor(Math.random() * 1500 * 100) / 100);

  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error(err));
  }, []);

  const limit = 1500;
  const available = limit - balance;
  const points = calculateDailyPoints(new Date());

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
        {transactions.slice(0, 10).map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
};
