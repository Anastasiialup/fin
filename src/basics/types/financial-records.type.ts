export type FinancialRecord = {
  id: number;
  userId: number;
  amount: string;
  currency: string;
  description?: string;
  type: 'income' | 'expense'; // або як у тебе enum
  categoryId?: number | null;
  attachment?: string | null;
  month: string;
  year: number;
  categoryName?: string | null;
  categoryColor?: string | null;
};

export type NewFinancialRecord = Omit<FinancialRecord, 'id' | 'categoryName' | 'categoryColor'>;
