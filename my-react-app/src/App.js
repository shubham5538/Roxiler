// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './pages/Table';
import TransactionBarChart from './pages/TransactionsBarChart';
import TransactionPieChart from './pages/TransactionPieChart';
import TransactionStatistics from './pages/TransactionsStatistics';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Table />} />
        <Route exact path="/TransactionPieChart" element={<TransactionPieChart />} />
        <Route exact path="/TransactionStatistics" element={<TransactionStatistics />} />
        <Route exact path="/TransactionBarChart" element={<TransactionBarChart />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
