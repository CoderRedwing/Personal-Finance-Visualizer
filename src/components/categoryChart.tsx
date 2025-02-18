"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6347"];

export default function CategoryChart() {
  const [data, setData] = useState<any[]>([]);

  const fetchCategoryData = async () => {
    const { data } = await axios.get("/api/transactions");
    const categoryData = data.reduce((acc: Record<string, number>, transaction: any) => {
      const category = transaction.category || "Others";
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {});

    setData(Object.keys(categoryData).map((key) => ({
      category: key,
      amount: categoryData[key],
    })));
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="amount" nameKey="category" outerRadius={100} fill="#8884d8">
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
