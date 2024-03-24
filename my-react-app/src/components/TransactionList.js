// TransactionList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/transactions'); // Update the endpoint
        setTransactions(response.data);
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
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>
            <p>Title: {transaction.title}</p>
            <p>Description: {transaction.description}</p>
            <p>Price: {transaction.price}</p>
            {/* Add more transaction details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
