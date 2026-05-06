import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/types';
import { UsersState } from '../../store/users/users.reducer';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<{ users: UsersState }>) {
    this.users$ = this.store.select(state => state.users.users);
    this.loading$ = this.store.select(state => state.users.loading);
  }
}
