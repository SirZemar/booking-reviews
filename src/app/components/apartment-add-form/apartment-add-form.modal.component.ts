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
import {
  Subject,
  Subscription,
  concat,
  delay,
  finalize,
  of,
  switchMap,
} from 'rxjs';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-apartment-add-form',
  standalone: true,
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './apartment-add-form.modal.component.html',
  styleUrls: ['./apartment-add-form.modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentAddFormModalComponent implements OnDestroy {
  fb = inject(FormBuilder);
  apartmentService = inject(ApartmentService);
  reviewsService = inject(ReviewsService);
  subscription = new Subscription();

  isLoading = signal(false);

  private temporaryMessageSubject = new Subject<string>();
  temporaryMessage$ = this.temporaryMessageSubject.pipe(
    switchMap(value => concat(of(value), of('').pipe(delay(2000))))
  );

  form = this.fb.group({
    id: new FormControl(
      { value: this.data.id, disabled: true },
      Validators.required
    ),
    name: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<ApartmentAddFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  onSubmit() {
    this.isLoading.set(true);
    const name = this.form.get('name')?.value;
    const apartmentExist = this.apartmentService
      .apartments()
      .find(
        apartment => apartment.id.toLowerCase() === this.data.id.toLowerCase()
      );

    if (apartmentExist) {
      this.isLoading.set(false);
      this.temporaryMessageSubject.next('Apartment already exist!');
      return;
    }

    this.subscription = this.apartmentService
      .addApartment(this.data.id, name ? { name } : { name: this.data.id })
      .pipe(
        switchMap(() => {
          console.log(
            `Apartment added successfully. Now scraping reviews with id ${this.data.id}`
          );
          this.isLoading.set(false);
          this.dialogRef.close();
          return this.reviewsService.scrapeApartmentReviews(this.data.id);
        })
      )
      .subscribe({
        next: data => console.log(data),
        complete: () => console.log('Finished scraping apartment'),
        error: error =>
          console.log('Error adding or scraping apartment', error),
      });
  }

  requestCancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.isLoading()) {
      this.subscription.unsubscribe();
    }
  }
}
