import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule],
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }    

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  removeItem(carId: number) {
    this.cartService.removeFromCart(carId);
    this.loadCart();
  }

  updateQuantity(carId: number, quantity: number) {
    if (quantity < 1) return;
    this.cartService.updateQuantity(carId, quantity);
    this.calculateTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }
}
