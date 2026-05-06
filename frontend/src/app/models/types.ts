export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  createdAt?: string;
}

export interface ExpenseShare {
  id?: string;
  expenseId?: string;
  userId: string;
  shareAmount: number;
  user?: User;
  expense?: Expense;
}

export enum SplitType {
  EQUAL = 'EQUAL',
  EXACT = 'EXACT',
  PERCENT = 'PERCENT'
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  payerId: string;
  splitType: SplitType;
  payer?: User;
  expense_shares?: ExpenseShare[];
  createdAt?: string;
}

export interface Balance {
  userId: string;
  userName: string;
  amount: number;
}

export interface UserDetails {
  user: User;
  balances: Balance[];
  paidExpenses: Expense[];
  sharedExpenses: ExpenseShare[];
}

export interface GlobalBalance {
  payer: string;
  sharer: string;
  amount: number;
}
