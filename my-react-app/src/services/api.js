// api.js

const BASE_URL = 'http://localhost:5000/api';

export async function fetchTransactions(month, search = '', page = 1) {
  const response = await fetch(`${BASE_URL}/transactions?month=${month}&search=${search}&page=${page}`);
  const data = await response.json();
  return data;
}

export async function fetchStatistics(month) {
  const response = await fetch(`${BASE_URL}/statistics?month=${month}`);
  const data = await response.json();
  return data;
}

export async function fetchPieChartData() {
  // Implement function to fetch pie chart data
  try {
    const response = await fetch(`${BASE_URL}/pie-chart`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    throw error;
  }
}

export async function fetchBarChartData() {
  // Implement function to fetch bar chart data
  try {
    const response = await fetch(`${BASE_URL}/bar-chart`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    throw error;
  }
}
