import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {
  private apiUrl = 'http://localhost:3500/api/dashboard'; 

  constructor(private http: HttpClient) {}

  fetchDashbordData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
