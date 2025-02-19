import React from "react";

interface BudgetFormProps {
  categoryBudgets: Record<string, number>;
  onBudgetChange: (category: string, value: number) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ categoryBudgets, onBudgetChange }) => {
  return (
    <div className="card bg-white p-6 rounded-lg shadow-lg flex-1">
      <h2 className="text-xl font-semibold mb-4 text-center">Set Monthly Budgets</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {Object.keys(categoryBudgets).map((category) => (
          <div key={category} className="flex items-center justify-between border-b pb-3">
            <label className="text-gray-700 font-medium">{category} Budget:</label>
            <input
              type="number"
              value={categoryBudgets[category]}
              onChange={(e) => onBudgetChange(category, Number(e.target.value))}
              className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default BudgetForm;
