import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.loadUsers),
    mergeMap(() => this.apiService.getUsers()
      .pipe(
        map(users => UsersActions.loadUsersSuccess({ users })),
        catchError(error => of(UsersActions.loadUsersFailure({ error: error.message })))
      ))
  ));

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.addUser),
    mergeMap(({ user }) => this.apiService.createUser(user)
      .pipe(
        map(newUser => UsersActions.addUserSuccess({ user: newUser })),
        catchError(error => of(UsersActions.addUserFailure({ error: error.message })))
      ))
  ));

  loadUserDetails$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.loadUserDetails),
    mergeMap(({ id }) => this.apiService.getUserDetails(id)
      .pipe(
        map(details => UsersActions.loadUserDetailsSuccess({ details })),
        catchError(error => of(UsersActions.loadUserDetailsFailure({ error: error.message })))
      ))
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}
