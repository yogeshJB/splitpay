import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, SplitType } from '../../models/types';
import { addExpense } from '../../store/expenses/expenses.actions';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  expenseForm: FormGroup;
  users$: Observable<User[]>;
  selectedUserIds: string[] = [];
  sharesData: { [userId: string]: any } = {};
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ users: { users: User[] } }>,
    private router: Router
  ) {
    this.users$ = this.store.select(state => state.users.users);
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      payerId: ['', Validators.required],
      splitType: ['EQUAL', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSplitTypeChange() {
    this.errorMessage = null;
  }

  isUserSelected(userId: string): boolean {
    return this.selectedUserIds.includes(userId);
  }

  toggleUserSelection(userId: string) {
    if (this.isUserSelected(userId)) {
      this.selectedUserIds = this.selectedUserIds.filter(id => id !== userId);
      delete this.sharesData[userId];
    } else {
      this.selectedUserIds.push(userId);
      this.sharesData[userId] = {};
    }
  }

  updateShareValue(userId: string, event: any, type: string) {
    this.sharesData[userId][type] = event.target.value;
  }

  getShareValue(userId: string, type: string) {
    return this.sharesData[userId][type] || '';
  }

  onSubmit() {
    const { description, amount, payerId, splitType } = this.expenseForm.value;
    const shares: any[] = [];

    if (splitType === 'EQUAL') {
      this.selectedUserIds.forEach(userId => shares.push({ userId }));
    } else if (splitType === 'EXACT') {
      let sum = 0;
      for (const userId of this.selectedUserIds) {
        const val = parseFloat(this.sharesData[userId].amount || 0);
        sum += val;
        shares.push({ userId, amount: val });
      }
      if (Math.abs(sum - amount) > 0.01) {
        this.errorMessage = `Total amount (Rs. ${amount}) doesn't match sum of shares (Rs. ${sum.toFixed(2)})`;
        return;
      }
    } else if (splitType === 'PERCENT') {
      let sum = 0;
      for (const userId of this.selectedUserIds) {
        const val = parseFloat(this.sharesData[userId].percent || 0);
        sum += val;
        shares.push({ userId, percent: val });
      }
      if (Math.abs(sum - 100) > 0.01) {
        this.errorMessage = `Total percentage must be 100%. Current sum: ${sum}%`;
        return;
      }
    }

    const payload = { description, amount, payerId, splitType, shares };
    this.store.dispatch(addExpense({ expense: payload }));
    this.router.navigate(['/']);
  }
}
