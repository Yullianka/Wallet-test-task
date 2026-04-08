import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTransactions } from '../hooks/useTransactions';
import { formatDetailDate, formatTransactionAmount } from '../utils/date';
import { DEFAULT_CARD_NAME } from '../constants/app';
import styles from './TransactionDetail.module.css';

export const TransactionDetail = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { transactions, loading, error } = useTransactions();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (error) {
    return <div className={styles.loading}>Failed to load transaction.</div>;
  }

  const transaction = transactions.find((tx) => tx.id === id);
  if (!transaction) {
    return <div className={styles.loading}>Transaction not found.</div>;
  }

  const displayAmount = formatTransactionAmount(transaction);
  const cardName = transaction.cardName ?? DEFAULT_CARD_NAME;

  return (
    <div className={styles.page}>
      <button
        onClick={() => navigate(-1)}
        className={styles.backButton}
        aria-label="Go back"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className={styles.header}>
        <div className={styles.amount}>{displayAmount}</div>
        <div className={styles.name}>{transaction.name}</div>
        <div className={styles.date}>{formatDetailDate(transaction.date)}</div>
      </div>

      <div className={styles.detailsCard}>
        <div className={styles.statusText}>
          Status: {transaction.pending ? 'Pending' : 'Approved'}
        </div>

        <div className={styles.description}>
          {transaction.description}
        </div>

        {transaction.authorizedUser && (
          <div className={styles.metaRow}>
            Authorized user: {transaction.authorizedUser}
          </div>
        )}

        {transaction.cashbackPercent != null && (
          <div className={styles.metaRow}>
            Cashback: {transaction.cashbackPercent}%
          </div>
        )}

        <div className={styles.cardName}>{cardName}</div>

        <div className={styles.totalRow}>
          <span>Total</span>
          <span>{displayAmount}</span>
        </div>
      </div>
    </div>
  );
};
