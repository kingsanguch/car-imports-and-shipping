import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Vehicle {
  id: number;
  model: string;
  year: number;
  price: number;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private storageKey = 'vehicles';
  private vehicles: Vehicle[] = [
    { id: 1, model: 'Sedan X', year: 2022, price: 25000, image: 'assets/car1.jpg' },
    { id: 2, model: 'SUV Pro', year: 2023, price: 35000, image: 'assets/car2.jpg' }
  ];

  constructor() {
    const storedVehicles = localStorage.getItem(this.storageKey);
    if (storedVehicles) {
      this.vehicles = JSON.parse(storedVehicles);
    } else {
      this.saveVehicles();
    }
  }

  getVehicles(): Observable<Vehicle[]> {
    return of(this.vehicles);
  }

  addVehicle(vehicle: Partial<Vehicle>): Observable<boolean> {
    const newVehicle: Vehicle = {
      id: new Date().getTime(),
      model: vehicle.model || '',
      year: vehicle.year || new Date().getFullYear(),
      price: vehicle.price || 0,
      image: vehicle.image || 'assets/default-car.jpg'
    };
    this.vehicles.push(newVehicle);
    this.saveVehicles();
    return of(true);
  }

  editVehicle(updatedVehicle: Vehicle): Observable<boolean> {
    const index = this.vehicles.findIndex(v => v.id === updatedVehicle.id);
    if (index > -1) {
      this.vehicles[index] = updatedVehicle;
      this.saveVehicles();
      return of(true);
    }
    return of(false);
  }

  deleteVehicle(vehicleId: number): Observable<boolean> {
    this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);
    this.saveVehicles();
    return of(true);
  }

  private saveVehicles(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.vehicles));
  }
}
