import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Customer } from '../../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = 'http://localhost:5166/api/Customers/';
  
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<{ success: boolean; message: string; data: Customer []}> {
    return this.http.get<{ success: boolean; message: string; data: Customer [] }>(this.apiUrl + 'SalesDatePrediction')
      .pipe(
        catchError(() => {
          return of({ success: false, message: 'Error Querying Customers', data: [] }); 
        })        
      );
  }
}
