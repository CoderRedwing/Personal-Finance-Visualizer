"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {TransactionFormData} from '../app/types/index'

// Define the validation schema using Zod
const transactionSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than 0"),
  description: z.string().min(3, "Description is too short"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"), // Ensure it's a valid date string
});

export default function TransactionForm({ onTransactionAdded, transactionToEdit }: { onTransactionAdded: () => void; transactionToEdit?: { _id: string; amount: number; description: string; date: string }; }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  // Open the dialog when editing a transaction
  useEffect(() => {
    if (transactionToEdit) {
        reset({
          amount: transactionToEdit.amount,
      description: transactionToEdit.description,
      date: transactionToEdit.date,
      }); // Pre-fill the form with transaction data
      setOpen(true); // Open the dialog for editing
    } else {
       setOpen(false); 
    }
  }, [transactionToEdit, reset]);

  const onSubmit = async (data: TransactionFormData) => {
    try {
      if (transactionToEdit && transactionToEdit._id) {
        await axios.put(`/api/transactions/${transactionToEdit._id}`, data); // Update transaction
      } else {
        await axios.post("/api/transactions", data); // Add new transaction
      }
      reset();
      setOpen(false); // Close the dialog after submitting
      onTransactionAdded(); // Refresh the list after adding or editing
    } catch (error) {
      console.error("Error adding/updating transaction", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Only trigger for adding transactions */}
      {!transactionToEdit && (
        <DialogTrigger asChild>
          <Button className="mb-4">Add Transaction</Button>
        </DialogTrigger>
      )}
      
      <DialogContent>
        {/* Dialog Title with VisuallyHidden for accessibility */}
        <VisuallyHidden>
          <DialogTitle>{transactionToEdit ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
        </VisuallyHidden>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Amount field */}
          <Label>Amount</Label>
          <Input {...register("amount", { valueAsNumber: true })} type="number" />
          {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}

          {/* Description field */}
          <Label>Description</Label>
          <Input {...register("description")} />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}

          {/* Date field */}
          <Label>Date</Label>
          <Input {...register("date")} type="date" />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}

          {/* Submit button */}
          <Button type="submit">
            {transactionToEdit ? "Save Changes" : "Add Transaction"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
