import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  showLogoutModal = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user && user.name) {
      this.userName =
        user.name.charAt(0).toUpperCase() + user.name.slice(1);
    }
  }

  // Open logout confirmation modal
  openLogoutModal() {
    this.showLogoutModal = true;
  }

  // Close the modal
  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  // Confirm and perform logout
  confirmLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.showLogoutModal = false;
    this.router.navigate(['/login']);
  }
}
