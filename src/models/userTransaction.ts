import mongoose, { Schema, Document } from "mongoose";

export interface Transaction extends Document {
  amount: number;
  date: Date;
  description: string;
}

const transactionSchema = new Schema<Transaction>({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});


const Transaction = mongoose.models.Transaction ||
    mongoose.model<Transaction>("Transaction", transactionSchema);

export default Transaction;
