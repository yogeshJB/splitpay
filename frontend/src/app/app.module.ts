import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { usersReducer } from './store/users/users.reducer';
import { UsersEffects } from './store/users/users.effects';
import { expensesReducer } from './store/expenses/expenses.reducer';
import { ExpensesEffects } from './store/expenses/expenses.effects';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { BalanceSummaryComponent } from './components/balance-summary/balance-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserListComponent,
    UserFormComponent,
    UserDetailsComponent,
    ExpenseListComponent,
    ExpenseFormComponent,
    BalanceSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      users: usersReducer,
      expenses: expensesReducer
    }),
    EffectsModule.forRoot([UsersEffects, ExpensesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
