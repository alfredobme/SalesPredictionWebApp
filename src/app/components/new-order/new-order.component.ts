import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Customer } from '../../models/customer.model';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { EmployeesService } from '../../services/employees/employees.service';
import { Employee } from '../../models/employee.models';
import { ShippersService } from '../../services/shippers/shippers.service';
import { Shipper } from '../../models/shipper.model';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from '../../services/orders/orders.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent {
  customer: Customer;
  orderForm: FormGroup;
  employees: Employee[] = [];
  shippers: Shipper[] = [];
  products: Product[] = [];

  constructor(
    private dialogRef: MatDialogRef<NewOrderComponent>, 
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private employeesService: EmployeesService,
    private shippersService: ShippersService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customer = data.customer;

    this.orderForm = this.fb.group({
      employee: ['', Validators.required],
      shipper: ['', Validators.required],
      shipName: ['', Validators.required],
      shipAddress: ['', Validators.required],
      shipCity: ['', Validators.required],
      shipCountry: ['', Validators.required],
      orderDate: ['', Validators.required],
      requiredDate: ['', Validators.required],
      shippedDate: ['', Validators.required],
      freight: ['', [Validators.required, Validators.min(0)]],
      product: ['', Validators.required],
      unitprice: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      discount: ['', [Validators.required, Validators.min(0)]],
    });
  }  

  ngOnInit() {
    this.loadEmployees();
    this.loadShippers();
    this.loadProducts();
  }

  private loadEmployees() {
    this.employeesService.getEmployees().subscribe(response => {
      if (response.success) {
        this.employees = response.data
      }
    });
  }

  private loadShippers() {
    this.shippersService.getShippers().subscribe(response => {
      if (response.success) {
        this.shippers = response.data
      }
    });
  }

  private loadProducts() {
    this.productsService.getProducts().subscribe(response => {
      if (response.success) {
        this.products = response.data
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  submitForm() {
    if (this.orderForm.valid) {
      const orderData = {
        custid: this.customer.customerId,
        empid: this.orderForm.get('employee')?.value,
        orderdate: this.orderForm.get('orderDate')?.value,
        requireddate: this.orderForm.get('requiredDate')?.value,
        shippeddate: this.orderForm.get('shippedDate')?.value,
        shipperid: this.orderForm.get('shipper')?.value,
        freight: this.orderForm.get('freight')?.value,
        shipname: this.orderForm.get('shipName')?.value,
        shipaddress: this.orderForm.get('shipAddress')?.value,
        shipcity: this.orderForm.get('shipCity')?.value,
        shipcountry: this.orderForm.get('shipCountry')?.value,
        orderDetail: {
          productid: this.orderForm.get('product')?.value,
          unitprice: this.orderForm.get('unitprice')?.value,
          qty: this.orderForm.get('quantity')?.value,
          discount: this.orderForm.get('discount')?.value
        }
      };

      this.ordersService.AddNewOrder(orderData).subscribe(response => {
        if (response.success) {
          this.showSnackBar('Order saved successfully');
          this.dialogRef.close('orderSaved')
        }else{
          this.showSnackBar('Error entering order');
        }
      });
    } else {
      this.showSnackBar('Please complete all required fields');
    }
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['blue-snackbar']
    });
  }
}

