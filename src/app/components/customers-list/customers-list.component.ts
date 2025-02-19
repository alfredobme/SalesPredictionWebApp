import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomersOrdersComponent } from '../customers-orders/customers-orders.component';
import { CustomersService } from '../../services/customers/customers.service';
import { NewOrderComponent } from '../new-order/new-order.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule    
  ],
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['customerName', 'lastOrderDate', 'nextOrderDate', 'actions'];
  dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private customerService: CustomersService, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      if (response.success) {
        this.dataSource.data = response.data;
      }
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewOrders(customer: Customer) {
    this.dialog.open(CustomersOrdersComponent, {
      width: '1200px',
      height: '750px',
      disableClose: true,
      data: { customer }
    });
  }

  newOrder(customer: Customer) {
    const dialogRef = this.dialog.open(NewOrderComponent, {
      width: '900px',
      height: '750px',
      disableClose: true,
      data: { customer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'orderSaved') { 
        this.loadCustomers();
      }
    });
  }
}
