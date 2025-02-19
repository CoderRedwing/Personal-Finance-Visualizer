import React from "react";
import { FaChartPie, FaMoneyBillWave, FaExclamationTriangle } from "react-icons/fa"; // Import icons

interface SpendingInsightsCardProps {
  totalSpent: number;
  totalBudget: number;
  remaining: number;
  overBudgetCategories: string[];
}

const SpendingInsightsCard: React.FC<SpendingInsightsCardProps> = ({
  totalSpent,
  totalBudget,
  remaining,
  overBudgetCategories,
}) => {
  return (
    <div className="card bg-white p-6 rounded-lg shadow-lg flex-1">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Spending Insights</h2>
      
      <div className="space-y-4">
        {/* Total Spent */}
        <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg">
          <FaMoneyBillWave className="text-red-500 text-2xl" />
          <div className="text-right">
            <p className="text-gray-600">Total Spent</p>
            <p className="text-lg font-semibold text-red-600">₹{totalSpent.toFixed(2)}</p>
          </div>
        </div>

        {/* Total Budget */}
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
          <FaChartPie className="text-blue-500 text-2xl" />
          <div className="text-right">
            <p className="text-gray-600">Total Budget</p>
            <p className="text-lg font-semibold text-gray-800">₹{totalBudget.toFixed(2)}</p>
          </div>
        </div>

        {/* Remaining Budget */}
        <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
          <FaMoneyBillWave className="text-green-500 text-2xl" />
          <div className="text-right">
            <p className="text-gray-600">Remaining Budget</p>
            <p className={`text-lg font-semibold ${remaining < 0 ? "text-red-600" : "text-green-600"}`}>
              ₹{remaining.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Over Budget Categories */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <FaExclamationTriangle className="text-yellow-600 text-2xl" />
            <p className="text-gray-600 font-medium">Over Budget Categories</p>
          </div>
          {overBudgetCategories.length > 0 ? (
            <ul className="list-disc list-inside text-red-600">
              {overBudgetCategories.map((category, index) => (
                <li key={index} className="ml-2">{category}</li>
              ))}
            </ul>
          ) : (
            <p className="text-green-600 text-sm">No categories over budget 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpendingInsightsCard;
