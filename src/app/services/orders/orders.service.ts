import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:5166/api/Orders/';
  
  constructor(private http: HttpClient) { }


  getClientOrders(customerId: number): Observable<{ success: boolean; message: string; data: Order []}> {
    return this.http.get<{ success: boolean; message: string; data: Order [] }>(this.apiUrl + 'GetClientOrders/?idCustomer=' + customerId)
      .pipe(
        catchError(() => {
          return of({ success: false, message: 'Error Querying Orders', data: [] }); 
        })        
      );
  }


  AddNewOrder(orderData: any): Observable<{ success: boolean; message: string; data: Order []}> {
    return this.http.post<{ success: boolean; message: string; data: Order [] }>(
      this.apiUrl + 'AddNewOrder',
      orderData,
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .pipe(
        catchError(() => {
          return of({ success: false, message: 'Error Querying Orders', data: [] }); 
        })        
      );
  }
}
