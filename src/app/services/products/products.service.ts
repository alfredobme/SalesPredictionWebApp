import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:5166/api/Products/';
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<{ success: boolean; message: string; data: Product []}> {
    return this.http.get<{ success: boolean; message: string; data: Product [] }>(this.apiUrl + 'GetProducts')
      .pipe(
        catchError(() => {
          return of({ success: false, message: 'Error Querying Products', data: [] }); 
        })        
      );
  }

}
