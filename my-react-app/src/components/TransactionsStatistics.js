// src/components/TransactionsStatistics.js

import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../services/api';

const TransactionsStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState('March'); // Default month

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchStatistics(month);
        setStatistics(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [month]);

  return (
    <div>
      <h2>Transactions Statistics</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
          {/* Add other statistics here */}
        </div>
      )}
    </div>
  );
};

export default TransactionsStatistics;
