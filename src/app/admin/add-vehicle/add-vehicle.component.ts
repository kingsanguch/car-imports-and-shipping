import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../app/services/vehicle.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddVehicleComponent {
  vehicleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router
  ) {
    // Initialize the form; if no file is selected, the user can optionally enter a URL.
    this.vehicleForm = this.fb.group({
      model: ['', Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['']  // Will store the Base64 string or a URL
    });
  }

  // Handler for file input change. Converts the file to a Base64 string.
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // Update the form control with the Base64 encoded image.
        this.vehicleForm.patchValue({
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.vehicleService.addVehicle(this.vehicleForm.value).subscribe(success => {
        if (success) {
          // Navigate back to admin dashboard after adding
          this.router.navigate(['/admin']);
        }
      });
    }
  }
}
