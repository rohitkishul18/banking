import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
    private baseUrl = 'http://localhost:3500/api/transaction'
  constructor(private http: HttpClient) { }

  getTransactions(){
    return this.http.get(`${this.baseUrl}`);
  }

}
