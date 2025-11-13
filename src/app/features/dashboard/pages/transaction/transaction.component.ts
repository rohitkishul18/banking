import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  constructor(private transactionService: TransactionService) { }
    transactions: any[] = [];
    loading = true;
    errorMessage = '';
  ngOnInit(): void {
      this.fetchTransactions();
  }

  fetchTransactions(){
    this.transactionService.getTransactions().subscribe({
      next: (res:any) => {
        if (res.success) {
          this.transactions = res.data;
        } else {
          this.errorMessage = 'Failed to load accounts';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
        this.errorMessage = 'Server error while fetching accounts';
        this.loading = false;
      }
    });
  }
}
