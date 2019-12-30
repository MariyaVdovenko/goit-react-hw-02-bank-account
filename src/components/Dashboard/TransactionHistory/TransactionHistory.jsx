import React from 'react';
import styles from './TransactionHistory.module.css';
import T from 'prop-types';

const TransactionHistory = ({ transactions }) => (
  <table className={styles.history}>
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(transaction => (
        <tr key={transaction.id}>
          <td>{transaction.type}</td>
          <td>{transaction.amount}$</td>
          <td>{transaction.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  transactions: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      type: T.string,
      amount: T.number,
      date: T.string,
    }),
  ),
};

export default TransactionHistory;
