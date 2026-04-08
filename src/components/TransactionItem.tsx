import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faBullseye } from '@fortawesome/free-solid-svg-icons';
import type { Transaction } from '../types';
import { formatTransactionDate, formatTransactionAmount } from '../utils/date';
import { resolveIcon } from '../constants/icons';
import styles from './TransactionItem.module.css';

interface Props {
  transaction: Transaction;
}

const BACKGROUND_CLASSES: Record<string, string> = {
  Payment: styles.bgPayment,
  Apple: styles.bgApple,
  IKEA: styles.bgIKEA,
  Target: styles.bgTarget,
  Starbucks: styles.bgStarbucks,
  Netflix: styles.bgNetflix,
  Airalo: styles.bgAiralo,
};

export const TransactionItem = ({ transaction }: Props): React.JSX.Element => {
  const isPayment = transaction.type === 'Payment';
  const bgClass = isPayment
    ? BACKGROUND_CLASSES.Payment
    : BACKGROUND_CLASSES[transaction.name] ?? styles.bgDefault;

  return (
    <Link to={`/transaction/${transaction.id}`} className={styles.link}>
      <div className={styles.container}>
        <div className={`${styles.iconWrapper} ${bgClass}`}>
          {transaction.name === 'IKEA' ? (
            <span className={styles.ikeaLogo}>IKEA</span>
          ) : transaction.name === 'Target' ? (
            <FontAwesomeIcon icon={faBullseye} className={styles.targetLogo} />
          ) : (
            <FontAwesomeIcon icon={resolveIcon(transaction.icon)} size="lg" />
          )}
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.topRow}>
            <span className={styles.name}>{transaction.name}</span>
            <span className={styles.amount}>{formatTransactionAmount(transaction)}</span>
          </div>

          <div className={styles.middleRow}>
            <div className={styles.description}>
              {transaction.pending && <span>Pending &ndash; </span>}
              {transaction.description}
            </div>
            {!isPayment && transaction.cashbackPercent != null && (
              <span className={styles.cashback}>{transaction.cashbackPercent}%</span>
            )}
          </div>

          <div className={styles.bottomRow}>
            {transaction.authorizedUser ? `${transaction.authorizedUser} \u2013 ` : ''}
            {formatTransactionDate(transaction.date)}
          </div>
        </div>

        <div className={styles.chevron}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </Link>
  );
};
