"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import { Transaction } from "../app/types/index";

interface ChartData {
  month: string;
  amount: number;
  description: string;
}

export default function ExpenseChart() {
  const [data, setData] = useState<ChartData[]>([]);

  const fetchChartData = async () => {
    try {
      const { data } = await axios.get("/api/transactions");

      const groupedData = data.reduce((acc: Record<string, { amount: number; description: string }>, transaction: Transaction) => {
        const month = new Date(transaction.date).toLocaleString("default", { month: "short" });
        if (!acc[month]) {
          acc[month] = { amount: 0, description: transaction.description || "No description" };
        }
        acc[month].amount += transaction.amount;
        return acc;
      }, {});

      setData(
        Object.keys(groupedData).map((key) => ({
          month: key,
          amount: groupedData[key].amount,
          description: groupedData[key].description,
        }))
      );
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" barSize={50} /> 
        </BarChart>
      </ResponsiveContainer>

      {/* Table below the chart */}
      <div className="mt-6">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Month</th>
              <th className="px-4 py-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.month}>
                <td className="px-4 py-2 border">{entry.month}</td>
                <td className="px-4 py-2 border">{entry.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
