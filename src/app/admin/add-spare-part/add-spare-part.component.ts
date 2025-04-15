import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SparePartService } from '../../app/services/spare-part.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-spare-part',
  standalone: true,
  templateUrl: './add-spare-part.component.html',
  styleUrls: ['./add-spare-part.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddSparePartComponent {
  sparePartForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sparePartService: SparePartService,
    private router: Router
  ) {
    // Initialize the form; image field will store the Base64 string or a URL.
    this.sparePartForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['']
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
        this.sparePartForm.patchValue({
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.sparePartForm.valid) {
      this.sparePartService.addSparePart(this.sparePartForm.value).subscribe(success => {
        if (success) {
          // Navigate back to admin dashboard after adding.
          this.router.navigate(['/admin']);
        }
      });
    }
  }
}
