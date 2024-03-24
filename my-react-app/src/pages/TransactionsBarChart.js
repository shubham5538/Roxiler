import React, { useState, useEffect } from 'react';
import { fetchBarChartData } from '../services/api';

const TransactionBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState('February'); // Default month

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchBarChartData(month);
        setChartData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [month]);

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Render bar chart using chartData */}
        </div>
      )}
    </div>
  );
};

export default TransactionBarChart;
