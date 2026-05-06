import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'add-expense', component: ExpenseFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
