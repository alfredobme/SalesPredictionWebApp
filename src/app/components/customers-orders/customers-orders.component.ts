import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../../models/order.model';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Customer } from '../../models/customer.model';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-customers-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule, 
   ],
  templateUrl: './customers-orders.component.html',
  styleUrl: './customers-orders.component.css'
})
export class CustomersOrdersComponent implements AfterViewInit {
  customer: Customer;
  displayedColumns: string[] = ['orderid', 'requireddate', 'shippeddate', 'shipname', 'shipaddress', 'shipcity'];
  dataSource = new MatTableDataSource<Order>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<CustomersOrdersComponent>, 
    private ordersService: OrdersService, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customer = data.customer;
  }  

  ngOnInit(): void {
    this.ordersService.getClientOrders(this.customer.customerId).subscribe(response => {
      console.log(response)
      if (response.success) {
        this.dataSource.data = response.data;
      }
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  close() {
    this.dialogRef.close();
  }
}
