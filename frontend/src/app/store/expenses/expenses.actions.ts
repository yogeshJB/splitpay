import { createAction, props } from '@ngrx/store';
import { Expense, GlobalBalance } from '../../models/types';

export const loadExpenses = createAction('[Expenses] Load Expenses');
export const loadExpensesSuccess = createAction('[Expenses] Load Expenses Success', props<{ expenses: Expense[] }>());
export const loadExpensesFailure = createAction('[Expenses] Load Expenses Failure', props<{ error: string }>());

export const addExpense = createAction('[Expenses] Add Expense', props<{ expense: any }>());
export const addExpenseSuccess = createAction('[Expenses] Add Expense Success');
export const addExpenseFailure = createAction('[Expenses] Add Expense Failure', props<{ error: string }>());

export const loadBalances = createAction('[Expenses] Load Balances');
export const loadBalancesSuccess = createAction('[Expenses] Load Balances Success', props<{ balances: GlobalBalance[] }>());
export const loadBalancesFailure = createAction('[Expenses] Load Balances Failure', props<{ error: string }>());
