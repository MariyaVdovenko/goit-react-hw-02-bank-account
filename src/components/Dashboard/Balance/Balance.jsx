import React from 'react';
import styles from './Balance.module.css';

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

export default Balance;

/*
balance - текущий баланс
income - общая сумма доходов
expenses - общая сумма расходов
*/
