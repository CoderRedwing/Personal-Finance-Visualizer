// app/hooks/useCategorySpending.ts
import { useState, useEffect } from "react";
import { Transaction } from "../types";
import { getCategoryFromDescription } from "@/lib/categories";

// Custom hook to calculate category spending for the selected month
export const useCategorySpending = (transactions: Transaction[], selectedMonth: string) => {
  const [categorySpending, setCategorySpending] = useState<Record<string, number>>({});

  useEffect(() => {
    const spending: Record<string, number> = {};

    transactions.forEach((transaction) => {
      // Extract month from the transaction date
      const transactionMonth = new Date(transaction.date).toLocaleString("default", { month: "short" });

      // Only include transactions from the selected month
      if (transactionMonth === selectedMonth) {
        const category = getCategoryFromDescription(transaction.description); // Assuming getCategoryFromDescription exists
        spending[category] = (spending[category] || 0) + transaction.amount;
      }
    });

    setCategorySpending(spending);
  }, [transactions, selectedMonth]);

  return categorySpending;
};
