import React from 'react';
import styles from './Controls.module.css';

const Controls = ({ props }) => (
  <section className={styles.controls}>
    <input type="number" name="amount" />
    <button type="button">Deposit</button>
    <button type="button">Withdraw</button>
  </section>
);

export default Controls;
