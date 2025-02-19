
export const calculateRemainingBudget = (totalBudget: number, totalSpent: number) => {
  return totalBudget - totalSpent;
};

export function calculateOverBudgetCategories(
  categoryBudgets: Record<string, number>,
  categorySpending: Record<string, number>
): string[] {
  return Object.keys(categoryBudgets).filter(
    (category) => (categorySpending[category] || 0) > categoryBudgets[category]
  );
}

