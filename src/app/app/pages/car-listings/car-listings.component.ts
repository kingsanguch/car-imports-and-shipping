import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { CartService } from '../../services/cart.service'; // Import Cart Service
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-car-listings',
  templateUrl: './car-listings.component.html',
  styleUrls: ['./car-listings.component.scss'],
  imports: [CommonModule, RouterModule] // Import RouterModule for navigation
})
export class CarListingsComponent {
  cars: any[] = [];
  filteredCars: any[] = [];
  searchText = '';
  sortBy = 'model';
  
  // Holds the selected car for the modal
  selectedCar: any = null;

  constructor(
    private vehicleService: VehicleService,
    private cartService: CartService // Inject Cart Service
  ) {
    this.loadCars();
  }

  loadCars() {
    this.vehicleService.getVehicles().subscribe(data => {
      this.cars = data;
      this.filteredCars = data;
    });
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value.toLowerCase();
    this.filteredCars = this.cars.filter(car =>
      car.model.toLowerCase().includes(this.searchText)
    );
  }

  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortBy = select.value;
    this.filteredCars = this.filteredCars.sort((a, b) => {
      if (this.sortBy === 'year') {
        return a.year - b.year;
      } else if (this.sortBy === 'price') {
        return a.price - b.price;
      } else { // Default sort by model
        return a.model.localeCompare(b.model);
      }
    });
  }

  // Open modal with selected car details
  openDetails(car: any) {
    this.selectedCar = car;
  }

  // Close modal
  closeModal() {
    this.selectedCar = null;
  }

  // Add car to cart
  addToCart(car: any) {
    const cartItem = {
      id: car.id,
      name: car.model,
      price: car.price,
      image: car.image,
      quantity: 1
    };
    this.cartService.addToCart(cartItem);
    alert(`${car.model} added to cart! 🛒`);
  }
}
