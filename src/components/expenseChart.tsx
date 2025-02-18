"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

interface ChartData {
  month: string;
  amount: number;
}

export default function ExpenseChart() {
  const [data, setData] = useState<ChartData[]>([]); // ✅ Define correct type

  const fetchChartData = async () => {
    const { data } = await axios.get("/api/transactions");

    const groupedData = data.reduce((acc: Record<string, number>, transaction: any) => {
      const month = new Date(transaction.date).toLocaleString("default", { month: "short" });
      acc[month] = (acc[month] || 0) + transaction.amount;
      return acc;
    }, {});

    setData(
      Object.keys(groupedData).map((key) => ({
        month: key,
        amount: groupedData[key],
      }))
    );
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
