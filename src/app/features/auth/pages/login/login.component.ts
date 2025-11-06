import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder } from '@angular/forms';
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
  otpSent = false; // controls visibility of OTP input
  email: string = '';

  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {}

 ngOnInit() {
  this.loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]]
  });

  this.otpForm = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
  });
}

  // get email() {
  //   return this.loginForm.get('email')?.valid;
  // }

  sendOtp() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      this.authService.sendOtp(email).subscribe(
        (res) => {
          console.log(res);
          this.email = email;
          this.otpSent = true; // show OTP input
          alert('✅ OTP sent successfully to your email!');
        },
        (error) => {
          console.error(error);
          alert('❌ Failed to send OTP.');
        }
      );
    } else {
      alert('Please enter a valid email.');
    }
  }

  verifyOtp() {
  if (this.otpForm.valid) {
    const otp = this.otpForm.value.otp;

    this.authService.verifyOtp(this.email, otp).subscribe(
      (res: any) => {
        console.log(res);
        if (res.success) {
          alert('✅ OTP Verified Successfully!');
          this.router.navigate(['/dashboard']); // redirect after success
        } else {
          alert('❌ Invalid OTP. Please try again.');
        }
      },
      (error: any) => {
        console.error(error);
        alert('❌ Error verifying OTP.');
      }
    );
  } else {
    alert('Please enter a valid 6-digit OTP.');
  }
}






}
