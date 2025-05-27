export type FinancialRecord = {
  id: number;
  amount: number;
  currency: string;
  description?: string;
  type: 'income' | 'expense';
  categoryName?: string;
  month: string;
  year: number;
};

export type WalletSummary = {
  totalAmount: number; // income - expense
  totalIncome: number;
  totalExpense: number;
  totalSavings: number; // сума з категорії "заощадження"
};
