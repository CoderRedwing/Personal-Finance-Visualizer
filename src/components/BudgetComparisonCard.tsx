// components/BudgetComparisonCard.tsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface BudgetComparisonCardProps {
  categoryBudgets: Record<string, number>;
  categorySpending: Record<string, number>;
}

const BudgetComparisonCard: React.FC<BudgetComparisonCardProps> = ({ categoryBudgets, categorySpending }) => {
  const chartData = Object.keys(categoryBudgets).map((category) => ({
    category,
    budget: categoryBudgets[category],
    actual: categorySpending[category] || 0,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
      <h2 className="text-xl font-semibold mb-4">Budget vs Actual Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}
        >
          <Bar dataKey="budget" fill="#8884d8" barSize={50} />
          <Bar dataKey="actual" fill="#8884d8" barSize={50}  />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetComparisonCard;
