import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import styles from './Controls.module.css';
import T from 'prop-types';

export default class Controls extends Component {
  static defaultProps = {};

  static propTypes = {
    onCommitTransaction: T.func,
  };

  state = {
    amount: '',
  };

  handleChange = e => {
    this.setState({ amount: e.target.value });
  };

  handleSubmit = e => {
    if (this.state.amount <= 0) {
      NotificationManager.error(
        'Введите сумму для проведения операции!',
        'Ошибка',
        5000,
      );

      return;
    }
    this.props.onCommitTransaction(e.currentTarget.name, this.state.amount);
    this.setState({
      amount: '',
    });
  };

  render() {
    return (
      <section className={styles.controls}>
        <input
          type="number"
          name="amount"
          value={this.state.amount}
          onChange={this.handleChange}
        />
        <button type="button" name="deposit" onClick={this.handleSubmit}>
          Deposit
        </button>
        <button type="button" name="withdraw" onClick={this.handleSubmit}>
          Withdraw
        </button>
      </section>
    );
  }
}
