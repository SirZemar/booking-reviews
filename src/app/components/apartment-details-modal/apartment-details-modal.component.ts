import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApartmentService } from 'src/app/services/apartment/apartment.service';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-apartment-details-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './apartment-details-modal.component.html',
  styleUrls: ['./apartment-details-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentDetailsModalComponent implements OnDestroy {
  fb = inject(FormBuilder);
  apartmentService = inject(ApartmentService);
  subscription: Subscription = new Subscription();
  isLoading = signal(false);

  form = this.fb.group({
    id: new FormControl(
      { value: this.data.id, disabled: true },
      Validators.required
    ),
    name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<ApartmentDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  onSubmit() {
    this.isLoading.set(true);
    const name = this.form.get('name')?.value;

    this.subscription = this.apartmentService
      .addApartment(this.data.id, name ? { name } : { name: this.data.id })
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          this.dialogRef.close();
        })
      )
      .subscribe({
        next: value => console.log(value.valueOf()),
        error: error => console.log(error),
      });
  }

  requestCancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
