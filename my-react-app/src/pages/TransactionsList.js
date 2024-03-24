// src/pages/TransactionsList.js

import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';
import TransactionItem from '../components/TransactionItem';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactions('March'); // Default month
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Transactions List</h1>
      {transactions.map(transaction => (
        <TransactionItem key={transaction._id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionsList;
