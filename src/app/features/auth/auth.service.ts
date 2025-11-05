import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:3500/api/auth';

  sendOtp(email: string) {
      return this.http.post(`${this.baseUrl}`, { email });
  }
   verifyOtp(email: string, otp: string){
    return this.http.post(`${this.baseUrl}/verify-otp`, { email, otp });
  }

}
