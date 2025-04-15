import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Vehicle,  VehicleService } from '../../app/services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-vehicle',
  standalone: true,
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
  imports: [ReactiveFormsModule]
})
export class EditVehicleComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form
    this.vehicleForm = this.fb.group({
      id: [0],
      model: ['', Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['']
    });
  }

  ngOnInit() {
    const vehicleId = +this.route.snapshot.paramMap.get('id')!;
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      const vehicle = vehicles.find(v => v.id === vehicleId);
      if (vehicle) {
        this.vehicleForm.patchValue(vehicle);
      }
    });
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.vehicleService.editVehicle(this.vehicleForm.value).subscribe(success => {
        if (success) {
          this.router.navigate(['/admin']);
        }
      });
    }
  }
}
