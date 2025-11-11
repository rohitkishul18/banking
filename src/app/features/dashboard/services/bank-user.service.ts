import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankUserService {
  private baseUrl = 'http://localhost:3500/api/bankUser' 
  constructor(private http: HttpClient) { }

  getBankUser(){
    return this.http.get(`${this.baseUrl}`);
  }

  updateBankUser(id: string, data: any){
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteBankUser(id: string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
