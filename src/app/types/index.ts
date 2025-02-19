// app/types/index.ts
export interface Transaction {
  description: string;  
  amount: number;      
  date: Date;         
}

export interface TransactionFormData {
  amount: number;
  description: string;
  date: string;
  category?: string; // Optional field
}
