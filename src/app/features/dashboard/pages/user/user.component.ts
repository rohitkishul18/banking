import { Component, OnInit } from '@angular/core';

interface User {
  image: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  activeUserCount: number = 250;
  inactiveUserCount: number = 150;

  ngOnInit(): void {
    // Dummy user data
    this.users = [
      {
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'Rohit Sharma',
        email: 'rohit.sharma@example.com',
        role: 'Admin',
        active: true
      },
      {
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        name: 'Priya Mehta',
        email: 'priya.mehta@example.com',
        role: 'User',
        active: false
      },
      {
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        name: 'Amit Patel',
        email: 'amit.patel@example.com',
        role: 'Manager',
        active: true
      },
      {
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@example.com',
        role: 'User',
        active: true
      },
      {
        image: 'https://randomuser.me/api/portraits/men/5.jpg',
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        role: 'Support',
        active: false
      }
    ];
  }

  editUser(user: User) {
    console.log('Editing user:', user);
    // You can open modal or navigate to edit page here
  }

  deleteUser(user: User) {
    const confirmDelete = confirm(`Are you sure you want to delete ${user.name}?`);
    if (confirmDelete) {
      this.users = this.users.filter(u => u !== user);
      console.log('Deleted user:', user);
    }
  }
}
