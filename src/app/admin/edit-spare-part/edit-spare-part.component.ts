import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SparePartService, SparePart } from '../../app/services/spare-part.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-spare-part',
  standalone: true,
  templateUrl: './edit-spare-part.component.html',
  styleUrls: ['./edit-spare-part.component.scss'],
  imports: [ReactiveFormsModule]
})
export class EditSparePartComponent implements OnInit {
  sparePartForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sparePartService: SparePartService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sparePartForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['']
    });
  }

  ngOnInit() {
    const partId = +this.route.snapshot.paramMap.get('id')!;
    this.sparePartService.getSpareParts().subscribe((parts: SparePart[]) => {
      const part = parts.find(p => p.id === partId);
      if (part) {
        this.sparePartForm.patchValue(part);
      }
    });
  }

  onSubmit() {
    if (this.sparePartForm.valid) {
      this.sparePartService.editSparePart(this.sparePartForm.value).subscribe(success => {
        if (success) {
          this.router.navigate(['/admin']);
        }
      });
    }
  }
}
