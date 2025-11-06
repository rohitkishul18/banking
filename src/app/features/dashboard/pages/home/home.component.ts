import { Component, OnInit } from '@angular/core';
import {
  Chart,
  registerables // ✅ Required for Chart.js v3+
} from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  totalUsers = 1500;
  totalTransactions = 450;
  totalLoan = 1250000;
  activeAccounts = 860;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createLoanChart();
    this.createTransactionChart();
    this.createLoanTypeChart();
  }

  createLoanChart() {
    new Chart('loanChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Loans Invested (₹)',
            data: [200000, 180000, 250000, 220000, 260000, 290000],
            backgroundColor: '#00dfd8',
            borderRadius: 8,
          },
        ],
      },
      options: {
        plugins: {
          legend: { labels: { color: '#fff' } },
        },
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
            data: [150, 200, 180, 250, 220, 270],
            borderColor: '#4f9eff',
            backgroundColor: 'rgba(79, 158, 255, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        plugins: {
          legend: { labels: { color: '#fff' } },
        },
        scales: {
          x: { ticks: { color: '#ccc' }, grid: { color: '#222' } },
          y: { ticks: { color: '#ccc' }, grid: { color: '#222' } },
        },
      },
    });
  }


  // rounded chart 

  createLoanTypeChart() {
    new Chart('loanTypeChart', {
      type: 'doughnut',
      data: {
        labels: ['Home Loan', 'Car Loan', 'Business Loan', 'Personal Loan'],
        datasets: [
          {
            label: 'Loan Distribution',
            data: [400000, 250000, 350000, 250000],
            backgroundColor: [
              '#4ade80', // green
              '#60a5fa', // blue
              '#fbbf24', // yellow
              '#f87171', // red
            ],
            borderWidth: 2,
            borderColor: '#1e1e2f',
            hoverOffset: 12,
          },
        ],
      },
      options: {
        cutout: '80%', // ✅ Rounded donut style
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            maxWidth: 100,
            align: 'center',
            labels: { color: '#fff', padding: 20},
          },
        },
      },
    });
  }






}
