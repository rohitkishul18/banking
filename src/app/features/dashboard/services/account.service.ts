import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:3500/api/account';
  constructor(private http: HttpClient) { }

  
  getAllAccounts() {
    return this.http.get(`${this.baseUrl}`);
  }





}
