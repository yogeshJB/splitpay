import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GlobalBalance } from '../../models/types';
import { ExpensesState } from '../../store/expenses/expenses.reducer';

@Component({
  selector: 'app-balance-summary',
  templateUrl: './balance-summary.component.html',
  styleUrls: ['./balance-summary.component.css']
})
export class BalanceSummaryComponent {
  balances$: Observable<GlobalBalance[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<{ expenses: ExpensesState }>) {
    this.balances$ = this.store.select(state => state.expenses.balances);
    this.loading$ = this.store.select(state => state.expenses.loading);
  }
}
