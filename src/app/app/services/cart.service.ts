import { Injectable } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems';

  constructor() {}

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addToCart(item: any) {
    let cart = this.getCart();
    let existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      const cartItem: CartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      };
      cart.push(cartItem);
    }

    this.saveCart(cart);
    console.log('Cart Updated:', cart);
  }

  removeFromCart(itemId: number) {
    let cart = this.getCart().filter((item) => item.id !== itemId);
    this.saveCart(cart);
  }

  updateQuantity(itemId: number, quantity: number) {
    let cart = this.getCart();
    let item = cart.find((item) => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.saveCart(cart);
    }
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }
}
