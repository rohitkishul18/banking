import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashbordService } from '../../services/dashbord.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  totalUsers = 0;
  totalTransactions = 0;
  totalLoan = 0;
  activeAccounts = 0;

  loanTrends: number[] = [];
  transactionTrends: number[] = [];
  loanTypeDistribution: any = {};

  isLoading = true;
  hasError = false;

  constructor(private dashboardService: DashbordService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    this.dashboardService.fetchDashbordData().subscribe({
      next: (data: any) => {
        console.log('✅ Dashboard data:', data);
        this.totalUsers = data.totalUsers;
        this.totalTransactions = data.totalTransactions;
        this.totalLoan = data.totalLoan;
        this.activeAccounts = data.activeAccounts;

        this.loanTrends = data.loanTrends || [];
        this.transactionTrends = data.transactionTrends || [];
        this.loanTypeDistribution = data.loanTypeDistribution || {};

        this.createLoanChart();
        this.createTransactionChart();
        this.createLoanTypeChart();

        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching dashboard data:', err);
        this.isLoading = false;
        this.hasError = true;
      },
    });
  }

  createLoanChart() {
    new Chart('loanChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Loans Distributed (₹)',
            data: this.loanTrends,
            backgroundColor: '#00dfd8',
            borderRadius: 8,
          },
        ],
      },
      options: {
        plugins: { legend: { labels: { color: '#fff' } } },
        scales: {
          x: { ticks: { color: '#ccc' }, grid: { color: '#222' } },
          y: { ticks: { color: '#ccc' }, grid: { color: '#222' } },
        },
      },
    });
  }

  createTransactionChart() {
    new Chart('transactionChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Transactions',
            data: this.transactionTrends,
            borderColor: '#4f9eff',
            backgroundColor: 'rgba(79, 158, 255, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        plugins: { legend: { labels: { color: '#fff' } } },
        scales: {
          x: { ticks: { color: '#ccc' }, grid: { color: '#222' } },
          y: { ticks: { color: '#ccc' }, grid: { color: '#222' } },
        },
      },
    });
  }

  createLoanTypeChart() {
    new Chart('loanTypeChart', {
      type: 'doughnut',
      data: {
        labels: ['Home Loan', 'Car Loan', 'Business Loan', 'Personal Loan'],
        datasets: [
          {
            label: 'Loan Distribution',
            data: [
              this.loanTypeDistribution.homeLoan || 0,
              this.loanTypeDistribution.carLoan || 0,
              this.loanTypeDistribution.businessLoan || 0,
              this.loanTypeDistribution.personalLoan || 0,
            ],
            backgroundColor: ['#4ade80', '#60a5fa', '#fbbf24', '#f87171'],
            borderWidth: 2,
            borderColor: '#1e1e2f',
            hoverOffset: 12,
          },
        ],
      },
      options: {
        cutout: '75%',
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#fff', padding: 15 },
          },
        },
      },
    });
  }
}
