import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accounts: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (res:any) => {
        if (res.success) {
          this.accounts = res.data;
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
