import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Employee } from '../../models/employee.models';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'http://localhost:5166/api/Employees/';
  
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<{ success: boolean; message: string; data: Employee []}> {
    return this.http.get<{ success: boolean; message: string; data: Employee [] }>(this.apiUrl + 'GetEmployees')
      .pipe(
        catchError(() => {
          return of({ success: false, message: 'Error Querying Employees', data: [] }); 
        })        
      );
  }
}
