import React from 'react';
import styles from './Balance.module.css';
import T from 'prop-types';

const Balance = ({ balance, income, expenses }) => (
  <section className={styles.balance}>
    <span className={styles.balanceData}>
      <span role="img" aria-label="up">
        ⬆️
      </span>
      {income}$
    </span>
    <span className={styles.balanceData}>
      <span role="img" aria-label="down">
        ⬇️
      </span>
      {expenses}$
    </span>
    <span className={styles.balanceData}>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: T.number,
  income: T.number,
  expenses: T.number,
};
export default Balance;
