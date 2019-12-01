import React from 'react';
import styles from './Balance.module.css';

const Balance = ({ props }) => (
  <section className={styles.balance}>
    <span className={styles.balanceData}>
      <span role="img" aria-label="up">
        ⬆️
      </span>
      2000$
    </span>
    <span className={styles.balanceData}>
      <span role="img" aria-label="down">
        ⬇️
      </span>
      1000$
    </span>
    <span className={styles.balanceData}>Balance: 5000$</span>
  </section>
);

export default Balance;
