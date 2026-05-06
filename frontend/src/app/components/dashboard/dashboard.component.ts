import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../store/users/users.actions';
import { loadExpenses, loadBalances } from '../../store/expenses/expenses.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showUserForm = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadExpenses());
    this.store.dispatch(loadBalances());
  }
}
