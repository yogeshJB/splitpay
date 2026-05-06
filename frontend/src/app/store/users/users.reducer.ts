import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { User, UserDetails } from '../../models/types';

export interface UsersState {
  users: User[];
  userDetails: UserDetails | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  userDetails: null,
  loading: false,
  error: null
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, state => ({ ...state, loading: true })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  on(UsersActions.addUser, state => ({ ...state, loading: true })),
  on(UsersActions.addUserSuccess, (state, { user }) => ({ ...state, loading: false, users: [...state.users, user] })),
  
  on(UsersActions.loadUserDetails, state => ({ ...state, loading: true })),
  on(UsersActions.loadUserDetailsSuccess, (state, { details }) => ({ ...state, loading: false, userDetails: details }))
);
