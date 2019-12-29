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
import T from 'prop-types';

export default class Dashboard extends Component {
  static defaultProps = {};

  static propTypes = {
    isEnough: T.func,
    accountSummary: T.func,
  };

  state = {
    transactions: [],
  };

  handleSubmit = (nameOperation, amount) => {
    if (
      nameOperation === 'withdraw' &&
      !isEnough(this.state.transactions, amount)
    ) {
      NotificationManager.error(
        'На счету недостаточно средств для проведения операции!',
        'Ошибка',
        5000,
      );
      return;
    }
    this.saveTransaction(`${nameOperation}`, amount);
  };

  saveTransaction(transType, amount) {
    const transaction = {
      id: shortId.generate(),
      amount: Number(amount),
      date: new Date().toLocaleString(),
      type: transType,
    };

    this.addTransaction(transaction);
  }

  addTransaction(transaction) {
    this.setState(prevState => ({
      transactions: [...prevState.transactions, transaction],
    }));
  }

  render() {
    const { transactions } = this.state;
    const { deposit, withdraw } = accountSummary(this.state.transactions);
    const balance = deposit - withdraw;

    return (
      <div className="dashboard">
        <Controls onCommitTransaction={this.handleSubmit} />

        <Balance balance={balance} income={deposit} expenses={withdraw} />

        <TransactionHistory transactions={transactions} />
        <NotificationContainer />
      </div>
    );
  }
}
