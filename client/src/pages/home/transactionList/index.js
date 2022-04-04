import { useState, useEffect } from 'react';

import TransactionListTopbar from './topBar';
import TransactionList from './transactionList';
import { formatAxiosErrorResponse } from '../../../helpers/error';
import TransactionAPI from '../../../helpers/api/transaction';

export default function TransactionListContainer() {
  const [transactions, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    setTransaction([]);
    setIsLoading(true);
    setError(null);
    TransactionAPI.getAllTransactions()
    .then((result) => {
      if (!result.data.success) {
        throw new Error(result.data.message);
      }

      const data = result.data.data;
      setTransaction(data.transactions);
    })
    .catch(
      (error) => {
        let res = formatAxiosErrorResponse(error);
        setError(res);
      }
    )
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <>
      <TransactionListTopbar 
        handleRefresh={() => {loadTransactions()}}
      />
      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        error={error}
      />
    </>
  )
}