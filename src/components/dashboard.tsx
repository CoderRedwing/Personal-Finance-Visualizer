"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";
import { getCategoryFromDescription } from "../lib/categories";

// Define the types for the transaction data
interface Transaction {
  description: string;
  amount: number;
  date: string;
}

// Define the types for the category spend
interface CategorySpend {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347'];

export default function Dashboard() {
  const [yearlyCategorySpend, setYearlyCategorySpend] = useState<Record<string, CategorySpend[]>>({});
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);  

  // Fetch transaction data
  const fetchTransactionData = async () => {
    try {
      const { data } = await axios.get<Transaction[]>("/api/transactions");

      const categorySpendData: Record<string, Record<string, number>> = {};

      // Process the transaction data and categorize by year and description
      data.forEach((transaction) => {
        const year = new Date(transaction.date).getFullYear().toString();
        const category = getCategoryFromDescription(transaction.description);

        if (!categorySpendData[year]) {
          categorySpendData[year] = {};
        }

        categorySpendData[year][category] = (categorySpendData[year][category] || 0) + transaction.amount;
      });

      // Convert the data into the format required for the Pie chart
      const transformedData: Record<string, CategorySpend[]> = {};
      Object.keys(categorySpendData).forEach((year) => {
        transformedData[year] = Object.keys(categorySpendData[year]).map((category) => ({
          name: category,
          value: categorySpendData[year][category],
        }));
      });

      setYearlyCategorySpend(transformedData);
      setRecentTransactions(data.slice(0, 2));  
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  // Handle year change
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  // Get the data for the selected year
  const currentData = yearlyCategorySpend[selectedYear] || [];

  return (
    <div className="dashboard-container">

      {/* Dropdown to select the year */}
      <div className="year-selector mb-6 text-center">
        <label htmlFor="year font-bold" className="mr-2">Select Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange} className="p-2 border rounded">
          {Object.keys(yearlyCategorySpend).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Pie Chart showing spending by category */}
      <div className="pie-chart-container bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Annual Spending by Category ({selectedYear})</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={currentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percent, name }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Table to show annual total spending */}
      <div className="category-summary bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Total Annual Spending ({selectedYear})</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left">Category</th>
              <th className="px-4 py-2 border text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry) => (
              <tr key={entry.name}>
                <td className="px-4 py-2 border">{entry.name}</td>
                <td className="px-4 py-2 border text-right">{entry.value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {/* Cards Row */}
      <div className="flex space-x-6 mb-6 mt-6">
        {/* Total Expenses Card */}
        <div className="card bg-white p-6 rounded-lg shadow-lg flex-1">
          <h2 className="text-xl font-semibold mb-4">Total Annual Expenses ({selectedYear})</h2>
          <p className="text-2xl font-bold">
            {currentData.reduce((total, entry) => total + entry.value, 0).toFixed(2)}
          </p>
        </div>

        {/* Recent Transactions Card */}
        <div className="card bg-white p-6 rounded-lg shadow-lg flex-1">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
         {recentTransactions.length > 0 ? ( 
         <ul className="space-y-4">          
            {recentTransactions.map((transaction, index) => (
              <li key={index} className="flex justify-between">
                <div>
                  <p className="text-sm font-semibold">{getCategoryFromDescription(transaction.description)}</p>
                  <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{transaction.amount.toFixed(2)}</p>
                </div>
              </li>
            ))}
            </ul>
            ) : (
                <p>No recent transactions found.</p>
               )}          
        </div>
      </div>  
    </div>
  );
}
