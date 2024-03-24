// src/components/TransactionItem.js

import React from 'react';

function TransactionItem({ transaction }) {
  return (
    <div>
      <h3>{transaction.title}</h3>
      <p>{transaction.description}</p>
      <p>Price: ${transaction.price}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default TransactionItem;
