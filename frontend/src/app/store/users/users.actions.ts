import { createAction, props } from '@ngrx/store';
import { User, UserDetails } from '../../models/types';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: string }>());

export const addUser = createAction('[Users] Add User', props<{ user: Partial<User> }>());
export const addUserSuccess = createAction('[Users] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[Users] Add User Failure', props<{ error: string }>());

export const loadUserDetails = createAction('[Users] Load User Details', props<{ id: string }>());
export const loadUserDetailsSuccess = createAction('[Users] Load User Details Success', props<{ details: UserDetails }>());
export const loadUserDetailsFailure = createAction('[Users] Load User Details Failure', props<{ error: string }>());
