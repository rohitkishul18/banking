import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
 transactions = [
    {
      userName: 'Rohit Kumar',
      accountNo: 'AC123456',
      amount: 25000,
      type: 'Credit',
      status: 'Completed',
      date: '2025-11-07 10:30 AM'
    },
    {
      userName: 'Priya Sharma',
      accountNo: 'AC789012',
      amount: 15000,
      type: 'Debit',
      status: 'Pending',
      date: '2025-11-07 09:45 AM'
    },
    {
      userName: 'Amit Verma',
      accountNo: 'AC654321',
      amount: 12000,
      type: 'Debit',
      status: 'Failed',
      date: '2025-11-06 06:15 PM'
    },
    {
      userName: 'Neha Singh',
      accountNo: 'AC456987',
      amount: 50000,
      type: 'Credit',
      status: 'Completed',
      date: '2025-11-05 02:00 PM'
    }
  ];
}
