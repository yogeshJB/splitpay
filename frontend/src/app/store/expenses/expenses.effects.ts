import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as ExpensesActions from './expenses.actions';
import * as UsersActions from '../users/users.actions';

@Injectable()
export class ExpensesEffects {
  loadExpenses$ = createEffect(() => this.actions$.pipe(
    ofType(ExpensesActions.loadExpenses),
    mergeMap(() => this.apiService.getExpenses()
      .pipe(
        map(expenses => ExpensesActions.loadExpensesSuccess({ expenses })),
        catchError(error => of(ExpensesActions.loadExpensesFailure({ error: error.message })))
      ))
  ));

  addExpense$ = createEffect(() => this.actions$.pipe(
    ofType(ExpensesActions.addExpense),
    mergeMap(({ expense }) => this.apiService.addExpense(expense)
      .pipe(
        switchMap(() => [
          ExpensesActions.addExpenseSuccess(),
          ExpensesActions.loadExpenses(),
          ExpensesActions.loadBalances()
        ]),
        catchError(error => of(ExpensesActions.addExpenseFailure({ error: error.message })))
      ))
  ));

  loadBalances$ = createEffect(() => this.actions$.pipe(
    ofType(ExpensesActions.loadBalances),
    mergeMap(() => this.apiService.getBalances()
      .pipe(
        map(balances => ExpensesActions.loadBalancesSuccess({ balances })),
        catchError(error => of(ExpensesActions.loadBalancesFailure({ error: error.message })))
      ))
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}
