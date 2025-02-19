import { Routes } from '@angular/router';
import { CustomersListComponent } from './components/customers-list/customers-list.component';

export const routes: Routes = [
    { path: 'customer-list', component: CustomersListComponent },
    { path: '', redirectTo: 'customer-list', pathMatch: 'full'}
];
