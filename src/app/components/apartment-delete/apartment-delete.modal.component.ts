import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApartmentService } from 'src/app/services/apartment/apartment.service';
// Angular material components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-apartment-delete',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './apartment-delete.modal.component.html',
  styleUrls: ['./apartment-delete.modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentDeleteModalComponent {
  apartmentService = inject(ApartmentService);

  constructor(
    public dialogRef: MatDialogRef<ApartmentDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  confirmDelete() {
    this.apartmentService
      .deleteApartment(this.data.id)
      .pipe(
        finalize(() => {
          this.dialogRef.close();
        })
      )
      .subscribe({
        next: () => {
          console.log(`Apartment deleted successfully`);
        },
        error: error => console.log('Error deleting apartment', error),
        complete: () => console.log('Delete apartment completed'),
      });
  }

  rejectDelete() {
    this.dialogRef.close();
  }
}
