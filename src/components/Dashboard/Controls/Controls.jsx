import React, { Component } from 'react';
import styles from './Controls.module.css';

export default class Controls extends Component {
  static defaultProps = {};

  static propTypes = {};
  0;
  render() {
    return (
      <section className={styles.controls}>
        <input
          type="number"
          name="amount"
          value={this.props.amount}
          onChange={this.props.handleChange}
        />
        <button type="button" name="Withdraw" onClick={this.props.onWithdraw}>
          Withdraw
        </button>
        <button type="button" name="Deposit" onClick={this.props.onDeposit}>
          Deposit
        </button>
      </section>
    );
  }
}
