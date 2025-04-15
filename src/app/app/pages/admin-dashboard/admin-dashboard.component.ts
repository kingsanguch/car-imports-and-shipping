import { Component } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { SparePartService } from '../../services/spare-part.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [CommonModule]
})
export class AdminDashboardComponent {
  vehicles: any[] = [];
  spareParts: any[] = [];

  constructor(
    private vehicleService: VehicleService,
    private sparePartService: SparePartService,
    private router: Router
  ) {
    this.loadData();
  }

  loadData() {
    this.vehicleService.getVehicles().subscribe(data => this.vehicles = data);
    this.sparePartService.getSpareParts().subscribe(data => this.spareParts = data);
  }

  // Vehicle CRUD Navigation
  addVehicle() {
    this.router.navigate(['/admin/add-vehicle']);
  }

  editVehicle(vehicle: any) {
    this.router.navigate(['/admin/edit-vehicle', vehicle.id]);
  }

  deleteVehicle(vehicle: any) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(vehicle.id).subscribe(success => {
        if (success) {
          this.loadData();
        }
      });
    }
  }

  // Spare Parts CRUD Navigation
  addSparePart() {
    this.router.navigate(['/admin/add-spare-part']);
  }

  editSparePart(part: any) {
    this.router.navigate(['/admin/edit-spare-part', part.id]);
  }

  deleteSparePart(part: any) {
    if (confirm('Are you sure you want to delete this spare part?')) {
      this.sparePartService.deleteSparePart(part.id).subscribe(success => {
        if (success) {
          this.loadData();
        }
      });
    }
  }
}
