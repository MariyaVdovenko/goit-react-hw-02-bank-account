import React, { Component } from 'react';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import shortId from 'shortid';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

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
  accountSummary = transactions => {
    const summary = transactions.reduce(
      (acc, t) => {
        return {
          ...acc,
          [t.type]: t.amount + acc[t.type],
        };
      },
      {
        deposit: 0,
        withdraw: 0,
      },
    );
    return summary;
  };
  isEnough = () => {
    const { deposit, withdraw } = this.accountSummary(this.state.transactions);

    const balance = deposit - withdraw;

    return balance >= Number(this.state.amount);
  };
  onWithdraw = e => {
    if (this.state.amount <= 0) {
      NotificationManager.error(
        'Введите сумму для проведения операции!',
        'Ошибка',
        5000,
      );

      return;
    }
    if (!this.isEnough()) {
      NotificationManager.error(
        'На счету недостаточно средств для проведения операции!',
        'Ошибка',
        5000,
      );
      return;
    }

    this.addTransaction('withdraw');
  };

  onDeposit = e => {
    if (this.state.amount <= 0) {
      NotificationManager.error(
        'Введите сумму для проведения операции!',
        'Ошибка',
        5000,
      );

      return;
    }
    this.addTransaction('deposit');
  };

  addTransaction(transType) {
    this.setState(prevState => ({
      amount: '',
      transactions: [
        ...prevState.transactions,
        {
          id: shortId.generate(),
          amount: Number(prevState.amount),
          date: new Date().toLocaleString(),
          type: transType,
        },
      ],
    }));
  }

  render() {
    const { amount, transactions } = this.state;
    const { deposit, withdraw } = this.accountSummary(this.state.transactions);
    const balance = deposit - withdraw;

    return (
      <div className="dashboard">
        <Controls
          amount={amount}
          handleChange={this.handleChange}
          onWithdraw={this.onWithdraw}
          onDeposit={this.onDeposit}
        />

        <Balance balance={balance} income={deposit} expenses={withdraw} />

        <TransactionHistory transactions={transactions} />
        <NotificationContainer />
      </div>
    );
  }
}
