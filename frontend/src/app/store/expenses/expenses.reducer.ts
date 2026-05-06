import { createReducer, on } from '@ngrx/store';
import * as ExpensesActions from './expenses.actions';
import { Expense, GlobalBalance } from '../../models/types';

export interface ExpensesState {
  expenses: Expense[];
  balances: GlobalBalance[];
  loading: boolean;
  error: string | null;
}

export const initialState: ExpensesState = {
  expenses: [],
  balances: [],
  loading: false,
  error: null
};

export const expensesReducer = createReducer(
  initialState,
  on(ExpensesActions.loadExpenses, state => ({ ...state, loading: true })),
  on(ExpensesActions.loadExpensesSuccess, (state, { expenses }) => ({ ...state, loading: false, expenses })),
  on(ExpensesActions.loadExpensesFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  on(ExpensesActions.loadBalances, state => ({ ...state, loading: true })),
  on(ExpensesActions.loadBalancesSuccess, (state, { balances }) => ({ ...state, loading: false, balances }))
);
