import { Component, OnInit } from '@angular/core';
import { BankUserService } from '../../services/bank-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  _id?: string;
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
  activeUserCount = 0;
  inactiveUserCount = 0;

  editUserForm!: FormGroup;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  selectedUser: User | null = null;

  constructor(private BankUserService: BankUserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchUsers();

    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      role: ['', Validators.required],
      active: [true, Validators.required],
    });
  }

  fetchUsers() {
    this.BankUserService.getBankUser().subscribe({
      next: (data: any) => {
        this.users = data.data;
        this.activeUserCount = this.users.filter(u => u.active).length;
        this.inactiveUserCount = this.users.filter(u => !u.active).length;
      },
      error: (err:any) => console.error('❌ Error fetching user data:', err),
    });
  }

  // --- Edit Modal ---
  openEditModal(user: User) {
    this.selectedUser = user;
    this.editUserForm.patchValue({
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
    });
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  updateUser() {
    if (!this.selectedUser) return;
    const updatedData = this.editUserForm.getRawValue();

    this.BankUserService.updateBankUser(this.selectedUser._id!, updatedData).subscribe({
      next: () => {
        this.fetchUsers();
        this.closeEditModal();
      },
      error: err => console.error('❌ Error updating user:', err),
    });
  }

  // --- Delete Modal ---
  openDeleteModal(user: User) {
    this.selectedUser = user;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  confirmDelete() {
    if (!this.selectedUser) return;

    this.BankUserService.deleteBankUser(this.selectedUser._id!).subscribe({
      next: () => {
        this.fetchUsers();
        this.closeDeleteModal();
      },
      error: (err:any) => console.error('❌ Error deleting user:', err),
    });
  }
}
