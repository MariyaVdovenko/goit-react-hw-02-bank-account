/*Необходимо создать компоненты <Dashboard>, <Controls>, <Balance> и <TransactionHistory> c необходимыми пропами и состоянием.

Описание компонента Dashboard
Родительский компонент, контейнер. В состоянии компонент хранит историю 
транзакций (массив объектов) в state.transactions и текущий баланс (число) в state.balance, 
и пробрасывает необходимые данные своим детям как пропы.

Каждая транзакиця это объект следующего формата:

id - уникальный идентификатор, строка. Для генерации id используй пакет shortid или uuid.
type - тип транзакции, один из двух, deposit или withdrawal, строка.
amount - сумма транзакции, число.
date - дата транзакции, результат метода Date.prototype.toLocaleString(), строка. */

import React, { Component } from 'react';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import shortId from 'shortid';

export default class Dashboard extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    transactions: [],
    transactionType: '',
    balance: 0,
    amount: '',
    income: '',

    expenses: '',
  };
  handleChange = e => {
    this.setState({ amount: e.target.value });
  };
  onWithdraw = e => {
    if (this.state.amount <= 0) {
      alert('Введите сумму для проведения операции!');
      return;
    }
    if (this.state.amount > this.state.balance) {
      alert('На счету недостаточно средств для проведения операции!');
      return;
    }
    this.setState({
      balance: Number(this.state.balance) - Number(this.state.amount),
      transactionType: e.currentTarget.name,
      amount: '',
    });
    this.setState(prevState => ({
      expenses: (Number(prevState.expenses) - Number(this.state.amount)) * -1,
    }));
    this.saveTransaction(this.state.amount, this.state.transactionType);
  };
  onDeposit = e => {
    if (this.state.amount <= 0) {
      alert('Введите сумму для проведения операции!');
      return;
    }
    this.setState({
      balance: Number(this.state.balance) + Number(this.state.amount),
      transactionType: e.currentTarget.name,
      amount: '',
    });
    this.setState(prevState => ({
      income: Number(prevState.income) + Number(this.state.amount),
    }));

    this.saveTransaction(this.state.amount, this.state.transactionType);
    console.log(this.state.transactionType);
  };
  saveTransaction = (amount, transactionType) => {
    const transaction = {
      id: shortId.generate(),
      amount: amount,
      date: new Date().toLocaleString(),
      type: transactionType,
    };
    this.handleSubmit(transaction);
  };
  handleSubmit = transaction => {
    this.setState(state => ({
      transactions: [...this.state.transactions, transaction],
    }));
  };

  render() {
    const { amount, expenses, income, balance, transactions } = this.state;
    return (
      <div className="dashboard">
        <Controls
          amount={amount}
          handleChange={this.handleChange}
          onWithdraw={this.onWithdraw}
          onDeposit={this.onDeposit}
        />

        <Balance balance={balance} income={income} expenses={expenses} />

        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}
