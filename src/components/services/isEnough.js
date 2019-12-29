export const accountSummary = transactions => {
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
export const isEnough = (transactions, amount) => {
  const { deposit, withdraw } = accountSummary(transactions);

  const balance = deposit - withdraw;

  return balance >= Number(amount);
};
