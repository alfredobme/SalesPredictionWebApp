import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Shipper } from '../../models/shipper.model';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {
  private apiUrl = 'http://localhost:5166/api/Shippers/';
  
  constructor(private http: HttpClient) { }

  getShippers(): Observable<{ success: boolean; message: string; data: Shipper []}> {
    return this.http.get<{ success: boolean; message: string; data: Shipper [] }>(this.apiUrl + 'GetShippers')
      .pipe(
        catchError(() => {
          return of({ success: false, message: 'Error Querying Shippers', data: [] }); 
        })        
      );
  }
}
