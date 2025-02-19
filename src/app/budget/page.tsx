"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import BudgetForm from "@/components/BudgetForm";
import BudgetComparisonCard from "@/components/BudgetComparisonCard";
import SpendingInsightsCard from "@/components/SpendingInsightsCard";
import { calculateRemainingBudget, calculateOverBudgetCategories } from "@/lib/budgetUtils";
import { useCategorySpending } from "../hooks/useCategorySpending";

export default function BudgetPage() {
  const [transactions, setTransactions] = useState([]); 
  const [categoryBudgets, setCategoryBudgets] = useState<Record<string, number>>({
    food: 200,
    entertainment: 100,
    utilities: 150,
    travel: 150,
    health: 500,
    rent: 1000
  });
  const [selectedMonth, setSelectedMonth] = useState<string>("Jan");

  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`/api/transactions?month=${selectedMonth}`);
        setTransactions(response.data); 
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [selectedMonth]); 

  
  const categorySpending = useCategorySpending(transactions, selectedMonth);

  const handleBudgetChange = (category: string, value: number) => {
    setCategoryBudgets((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const totalSpent = Object.values(categorySpending).reduce((acc, curr) => acc + curr, 0);
  const totalBudget = Object.values(categoryBudgets).reduce((acc, curr) => acc + curr, 0);
  const remaining = calculateRemainingBudget(totalBudget, totalSpent);
  const overBudgetCategories = calculateOverBudgetCategories(categoryBudgets, categorySpending);
  console.log("Over Budget Categories:", overBudgetCategories);




  return (
    <div className="space-y-4 max-w-4xl mx-auto p-6">
      {/* Month selector to allow users to change the selected month */}
      <div className="mb-6">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded"
        >
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <BudgetForm categoryBudgets={categoryBudgets} onBudgetChange={handleBudgetChange} />
      <BudgetComparisonCard categoryBudgets={categoryBudgets} categorySpending={categorySpending} />
      <SpendingInsightsCard totalSpent={totalSpent} totalBudget={totalBudget} remaining={remaining} overBudgetCategories={overBudgetCategories} />
    </div>
  );
}

