import React, { Component } from 'react';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import shortId from 'shortid';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { accountSummary, isEnough } from '../services/isEnough';

export default class Dashboard extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    transactions: [],
    amount: '',
  };
  handleChange = e => {
    this.setState({ amount: e.target.value });
  };

  handleSubmit = e => {
    const nameOperation = e.currentTarget.name;

    if (this.state.amount <= 0) {
      NotificationManager.error(
        'Введите сумму для проведения операции!',
        'Ошибка',
        5000,
      );

      return;
    }
    if (
      nameOperation === 'withdraw' &&
      !isEnough(this.state.transactions, this.state.amount)
    ) {
      NotificationManager.error(
        'На счету недостаточно средств для проведения операции!',
        'Ошибка',
        5000,
      );
      return;
    }
    this.saveTransaction(`${nameOperation}`);
  };

  saveTransaction(transType) {
    const transaction = {
      id: shortId.generate(),
      amount: Number(this.state.amount),
      date: new Date().toLocaleString(),
      type: transType,
    };

    this.addTransaction(transaction);
  }

  addTransaction(transaction) {
    this.setState(prevState => ({
      amount: '',
      transactions: [...prevState.transactions, transaction],
    }));
  }

  render() {
    const { amount, transactions } = this.state;
    const { deposit, withdraw } = accountSummary(this.state.transactions);
    const balance = deposit - withdraw;

    return (
      <div className="dashboard">
        <Controls
          amount={amount}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        <Balance balance={balance} income={deposit} expenses={withdraw} />

        <TransactionHistory transactions={transactions} />
        <NotificationContainer />
      </div>
    );
  }
}
