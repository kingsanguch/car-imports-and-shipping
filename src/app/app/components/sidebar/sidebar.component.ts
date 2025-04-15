import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule,]
})
export class SidebarComponent {
  @Input() isOpen = false;

  constructor(private router: Router) {}

  navigate(link: string) {
    this.router.navigate([link]);
  }
}
