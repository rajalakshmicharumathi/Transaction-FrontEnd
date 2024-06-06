import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone:true,
  imports:[NgFor,RouterLink]
})
export class TransactionListComponent implements OnInit {

  transactions:any = [];

  constructor(private transactionService: TransactionService, private router: Router) { }

  ngOnInit() {
    this.transactions = this.transactionService.getTransactions();
  }

  viewDetails(id: number) {
    this.router.navigate(['/transaction-details', id]);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }
}
