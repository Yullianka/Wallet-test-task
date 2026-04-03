import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Transaction } from '../types';
import { formatTransactionDate, formatCurrency } from '../utils/date';
import { Link } from 'react-router-dom';
import styles from './TransactionItem.module.css';

interface Props {
  transaction: Transaction;
}

const backgroundClasses: Record<string, string> = {
  Payment: styles.bgPayment,
  Apple: styles.bgApple,
  IKEA: styles.bgIKEA,
  Target: styles.bgTarget,
  Starbucks: styles.bgStarbucks,
  Netflix: styles.bgNetflix,
  Airalo: styles.bgAiralo,
};

function resolveIcon(transaction: Transaction): IconDefinition {
  const iconName = transaction.icon as string;
  if (transaction.iconType === 'brand') {
    const icon = (brandIcons as Record<string, unknown>)[iconName];
    if (icon) return icon as IconDefinition;
  }
  const icon = (solidIcons as Record<string, unknown>)[iconName];
  if (icon) return icon as IconDefinition;
  return solidIcons.faCircle;
}

export const TransactionItem = ({ transaction }: Props): React.JSX.Element => {
  const isPayment = transaction.type === 'Payment';
  let iconContent;

  const bgClass = isPayment 
    ? backgroundClasses.Payment 
    : (backgroundClasses[transaction.name] ?? styles.bgDefault);

  if (transaction.name === 'IKEA') {
    iconContent = <span className={styles.ikeaLogo}>IKEA</span>;
  } else if (transaction.name === 'Target') {
    iconContent = <FontAwesomeIcon icon={solidIcons.faBullseye} className={styles.targetLogo} />;
  } else {
    const icon = resolveIcon(transaction);
    iconContent = <FontAwesomeIcon icon={icon} size="lg" />;
  }

  return (
    <Link to={`/transaction/${transaction.id}`} className={styles.link}>
      <div className={styles.container}>
        <div className={`${styles.iconWrapper} ${bgClass}`}>
          {iconContent}
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.topRow}>
            <span className={styles.name}>
              {transaction.name}
            </span>
            <div className={styles.amountWrapper}>
              <span className={styles.amount}>
                {isPayment ? `+$${formatCurrency(transaction.amount)}` : `$${formatCurrency(transaction.amount)}`}
              </span>
            </div>
          </div>

          <div className={styles.middleRow}>
            <div className={styles.description}>
              {transaction.pending && <span>Pending &ndash; </span>}
              {transaction.description}
            </div>
            {!isPayment && transaction.cashbackPercent != null && (
              <span className={styles.cashback}>
                {transaction.cashbackPercent}%
              </span>
            )}
          </div>

          <div className={styles.bottomRow}>
            {transaction.authorizedUser ? `${transaction.authorizedUser} \u2013 ` : ''}
            {formatTransactionDate(transaction.date)}
          </div>
        </div>

        <div className={styles.chevron}>
          <FontAwesomeIcon icon={solidIcons.faChevronRight} />
        </div>
      </div>
    </Link>
  );
};
