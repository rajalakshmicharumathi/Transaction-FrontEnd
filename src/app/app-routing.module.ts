import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/transaction-list', pathMatch: 'full' },
  { path: 'transaction-list', component: TransactionListComponent },
  { path: 'transaction-details/:id', component: TransactionDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
