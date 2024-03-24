import React, { useState, useEffect } from 'react';
import { fetchPieChartData } from '../services/api';

const TransactionPieChart = () => {
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState('February'); // Default month

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPieChartData(month);
        setPieData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [month]);

  return (
    <div>
      <h2>Transactions Pie Chart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Render pie chart using pieData */}
        </div>
      )}
    </div>
  );
};

export default TransactionPieChart;
