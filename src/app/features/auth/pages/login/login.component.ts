import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  otpForm!: FormGroup;
  otpSent = false;
  email: string = '';
  message: string = '';
  isSuccess: boolean = false;
  loading: boolean = false;
  loadingText: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
        ]
      ]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  sendOtp() {
    if (this.loginForm.invalid) {
      this.showMessage('Please enter a valid email address.', false);
      return;
    }

    this.loading = true;
    this.loadingText = 'Sending OTP...';
    const email = this.loginForm.value.email;

    this.authService.sendOtp(email).subscribe(
      (res) => {
        this.loading = false;
        this.email = email;
        this.otpSent = true;
        this.showMessage('✅ OTP sent successfully to your email.', true);
      },
      (error) => {
        this.loading = false;
        this.showMessage('❌ Failed to send OTP. Please try again.', false);
        console.error(error);
      }
    );
  }

 verifyOtp() {
  if (this.otpForm.invalid) {
    this.showMessage('Please enter a valid 6-digit OTP.', false);
    return;
  }

  this.loading = true;
  this.loadingText = 'Verifying OTP...';
  const otp = this.otpForm.value.otp;

  this.authService.verifyOtp(this.email, otp).subscribe(
    (res: any) => {
      this.loading = false;
      if (res.success) {
        // ✅ Save JWT token in localStorage
        localStorage.setItem('token', res.token);

        // Optionally store user info too
        localStorage.setItem('user', JSON.stringify(res.user));

        this.showMessage('✅ OTP Verified Successfully!', true);

        // Redirect after short delay
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      } else {
        this.showMessage('❌ Invalid OTP. Please try again.', false);
      }
    },
    (error) => {
      this.loading = false;
      this.showMessage('❌ Error verifying OTP. Please try again.', false);
      console.error(error);
    }
  );
}


  private showMessage(msg: string, success: boolean) {
    this.message = msg;
    this.isSuccess = success;
    setTimeout(() => (this.message = ''), 4000);
  }
}
