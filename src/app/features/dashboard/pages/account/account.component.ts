import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accounts = [
    {
      accountNumber: '100124598745',
      holderName: 'Rohit Kishul',
      type: 'Savings',
      balance: 125000.45,
      active: true
    },
    {
      accountNumber: '100198765432',
      holderName: 'Krishna Patel',
      type: 'Current',
      balance: 560000.00,
      active: true
    },
    {
      accountNumber: '100176543218',
      holderName: 'Anjali Mehta',
      type: 'Savings',
      balance: 92000.85,
      active: false
    },
    {
      accountNumber: '100143289054',
      holderName: 'Ramesh Sharma',
      type: 'Fixed Deposit',
      balance: 450000.00,
      active: true
    }
  ];

  ngOnInit(): void {}
}
