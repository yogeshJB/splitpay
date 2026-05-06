import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Expense } from '../../models/types';
import { ExpensesState } from '../../store/expenses/expenses.reducer';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent {
  expenses$: Observable<Expense[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<{ expenses: ExpensesState }>) {
    this.expenses$ = this.store.select(state => state.expenses.expenses);
    this.loading$ = this.store.select(state => state.expenses.loading);
  }
}
