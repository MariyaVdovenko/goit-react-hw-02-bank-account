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

export default class Dashboard extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    transactions: 0,
    balance: 0,
  };

  render() {
    return (
      <div className="dashboard">
        <Controls />

        <Balance />

        <TransactionHistory />
      </div>
    );
  }
}
