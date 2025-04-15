import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterLink]
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  cartCount: number = 0;

  constructor(
    public authService: AuthService, 
    private router: Router, 
    private cartService: CartService // Inject Cart Service
  ) {}

  ngOnInit() {
    this.updateCartCount();
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Update cart count
  updateCartCount() {
    this.cartCount = this.cartService.getCart().length;
  }
}
