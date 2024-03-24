import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';

const Table = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState('February'); // Default month

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions(month);
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [month]);

  // Function to handle search
  const handleSearch = async (searchText) => {
    try {
      setLoading(true);
      const data = await fetchTransactions(month, searchText);
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle pagination
  const handlePagination = async (pageNumber) => {
    try {
      setLoading(true);
      const data = await fetchTransactions(month, '', pageNumber);
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {/* Dropdown for selecting month */}
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        style={{ marginBottom: '10px', marginRight: '10px' }} // Inline CSS for select element
      >
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        {/* Add more months here */}
      </select>
      
      {/* Search input */}
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: '10px', marginRight: '10px' }} // Inline CSS for input element
      />

      {/* Transactions table */}
      <table style={{ marginBottom: '10px' }}> {/* Inline CSS for table element */}
        <thead>
          <tr>
            <th style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>Title</th> {/* Inline CSS for table header */}
            <th style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>Description</th> {/* Inline CSS for table header */}
            <th style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>Price</th> {/* Inline CSS for table header */}
            <th style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>category</th> {/* Inline CSS for table header */}
            <th style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>sold</th> {/* Inline CSS for table header */}
            <th style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>image</th> {/* Inline CSS for table header */}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            transactions.map(transaction => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <button
        onClick={() => handlePagination('previous')}
        style={{ marginRight: '10px' }} // Inline CSS for button element
      >
        Previous
      </button>
      <button onClick={() => handlePagination('next')}>Next</button>
    </div>
  );
};

export default Table;
