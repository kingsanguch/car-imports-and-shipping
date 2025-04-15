import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SparePartService } from '../../services/spare-part.service';
import { CartService } from '../../services/cart.service';  // Import CartService
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-spare-parts',
  templateUrl: './spare-parts.component.html',
  styleUrls: ['./spare-parts.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class SparePartsComponent {
  parts: any[] = [];
  filteredParts: any[] = [];
  searchText = '';
  selectedPart: any = null;

  constructor(
    private sparePartService: SparePartService,
    private cartService: CartService  // Inject CartService
  ) {
    this.loadParts();
  }

  loadParts() {
    this.sparePartService.getSpareParts().subscribe((data) => {
      this.parts = data;
      this.filteredParts = data;
    });
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value.toLowerCase();
    this.filteredParts = this.parts.filter((part) =>
      part.name.toLowerCase().includes(this.searchText)
    );
  }

  openDetails(part: any) {
    this.selectedPart = part;
  }

  closeModal() {
    this.selectedPart = null;
  }

  // Method to add spare parts to the cart
  addToCart(part: any) {
    const cartItem = {
      id: part.id,
      name: part.name,
      price: part.price,
      image: part.image,
      quantity: 1 
    };
    this.cartService.addToCart(cartItem);
    alert(`${part.name} added to cart! 🛒`);
  }
}
