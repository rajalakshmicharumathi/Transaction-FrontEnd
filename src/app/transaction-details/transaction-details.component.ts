import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../transaction.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
  standalone:true,
  imports:[ReactiveFormsModule]
})
export class TransactionDetailsComponent implements OnInit {

  transaction: any;
  transactionForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private fb: FormBuilder,
  ) { 
    this.transactionForm=this.fb.group({
      id: [{ value: '', disabled: true }],
      date: [{ value: '', disabled: true }],
      comments: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null; // Parse idParam to number if it's not null

    if (id !== null) {
      this.transaction = this.transactionService.getTransactions().find(t => t.id === id.toString());
      const date = this.formatDate(this.transaction.date);

      if (this.transaction) {
        this.transactionForm.patchValue({
          id: this.transaction.id,
          date: date,
          comments: this.transaction.Comments
        });
        

      } else {
        // Handle case where transaction is not found
        alert('Transaction not found.');
        // Optionally, navigate to an error page or show an error message.
      }
    } else {
      // Handle case where 'id' parameter is not present in the URL
      alert('No id parameter found in URL.');
      // Optionally, navigate to an error page or show an error message.
    }
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      if (this.transaction) {
        this.transactionService.updateTransaction(this.transaction.id, this.transactionForm.get('comments')!.value);
        this.router.navigate(['/transaction-list']);
      } else {
        alert('Transaction not found. Cannot submit form.');
        // Optionally, navigate to an error page or show an error message.
      }
    }else{
      alert('Alpha Numeric Charecters are allowed for comments');
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // Pad day and month with leading zero if necessary
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }
}










