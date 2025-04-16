import { provideRouter, withComponentInputBinding } from '@angular/router';
import { Routes } from '@angular/router';

// Standalone Components
import { LoginComponent } from './app/auth/login/login.component';
import { RegisterComponent } from './app/auth/register/register.component';
import { HomeComponent } from './app/pages/home/home.component';
import { CarListingsComponent } from './app/pages/car-listings/car-listings.component';
import { CartComponent } from './app/pages/cart/cart.component';
import { SparePartsComponent } from './app/pages/spare-parts/spare-parts.component';
import { UserDashboardComponent } from './app/pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './app/pages/admin-dashboard/admin-dashboard.component';

// Admin CRUD Components
import { AddVehicleComponent } from './admin/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './admin/edit-vehicle/edit-vehicle.component';
import { AddSparePartComponent } from './admin/add-spare-part/add-spare-part.component';
import { EditSparePartComponent } from './admin/edit-spare-part/edit-spare-part.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'car-listings', component: CarListingsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'spare-parts', component: SparePartsComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin/add-vehicle', component: AddVehicleComponent },
  {
    path: 'admin/edit-vehicle/:id',
    component: EditVehicleComponent, },
  
  { path: 'admin/add-spare-part', component: AddSparePartComponent },
  {
    path: 'admin/edit-spare-part/:id',
    component: EditSparePartComponent,
     }
];
