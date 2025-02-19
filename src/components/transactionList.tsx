"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TransactionForm from "./transactionForm";

interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
}

export default function TransactionList() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | undefined>(undefined);

  const fetchTransactions = async () => {
    const { data } = await axios.get("/api/transactions");
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const deleteTransaction = async (id: string) => {
    await axios.delete(`/api/transactions/${id}`);
    fetchTransactions();
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
      setTransactionToEdit(transaction); 
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto p-6 mt-6">
        <TransactionForm onTransactionAdded={fetchTransactions}
      transactionToEdit={transactionToEdit}    />

      {transactions.map((transaction) => (
        <Card key={transaction._id}>
          <CardContent className="flex justify-between p-4">
            <div>
              <p className="text-lg font-semibold">{transaction.description}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">${transaction.amount}</span>
              <Button onClick={() => handleEditTransaction(transaction)}>Edit</Button>        
              <Button variant="destructive" onClick={() => deleteTransaction(transaction._id)}>Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
