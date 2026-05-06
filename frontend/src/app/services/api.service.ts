import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Expense, UserDetails, GlobalBalance } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  getUserDetails(id: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.apiUrl}/users/${id}`);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expenses`);
  }

  addExpense(expense: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/expenses`, expense);
  }

  getBalances(): Observable<GlobalBalance[]> {
    return this.http.get<GlobalBalance[]>(`${this.apiUrl}/balances`);
  }
}
