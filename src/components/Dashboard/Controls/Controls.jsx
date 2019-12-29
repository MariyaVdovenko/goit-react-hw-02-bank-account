import React, { Component } from 'react';
import styles from './Controls.module.css';

export default class Controls extends Component {
  static defaultProps = {};

  static propTypes = {};

  render() {
    return (
      <section className={styles.controls}>
        <input
          type="number"
          name="amount"
          value={this.props.amount}
          onChange={this.props.handleChange}
        />
        <button type="button" name="deposit" onClick={this.props.handleSubmit}>
          Deposit
        </button>
        <button type="button" name="withdraw" onClick={this.props.handleSubmit}>
          Withdraw
        </button>
      </section>
    );
  }
}
