import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDetails } from '../../models/types';
import { loadUserDetails } from '../../store/users/users.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  details$: Observable<UserDetails | null>;
  activeTab: 'paid' | 'shared' = 'paid';
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ users: { userDetails: UserDetails | null } }>
  ) {
    this.details$ = this.store.select(state => state.users.userDetails);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(loadUserDetails({ id: params['id'] }));
      }
    });
  }
}
