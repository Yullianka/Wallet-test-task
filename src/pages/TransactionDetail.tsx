import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import type { Transaction } from '../types';
import { formatCurrency, formatDetailDate } from '../utils/date';
import styles from './TransactionDetail.module.css';

export const TransactionDetail = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then((data: Transaction[]) => {
        const found = data.find(tx => tx.id === id);
        if (found) setTransaction(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!transaction) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const isPayment = transaction.type === 'Payment';
  const displayAmount = isPayment
    ? `+$${formatCurrency(transaction.amount)}`
    : `$${formatCurrency(transaction.amount)}`;
  const cardName = transaction.cardName ?? 'RBC Bank Debit Card';

  return (
    <div className={styles.page}>
      <button
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className={styles.header}>
        <div className={styles.amount}>
          {displayAmount}
        </div>
        <div className={styles.name}>
          {transaction.name}
        </div>
        <div className={styles.date}>
          {formatDetailDate(transaction.date)}
        </div>
      </div>

      <div className={styles.detailsCard}>
        <div className={styles.statusRow}>
          <span className={styles.statusText}>
            Status: {transaction.pending ? 'Pending' : 'Approved'}
          </span>
        </div>
        <div className={styles.cardName}>
          {cardName}
        </div>
        <div className={styles.totalRow}>
          <span>Total</span>
          <span>{displayAmount}</span>
        </div>
      </div>
    </div>
  );
};
