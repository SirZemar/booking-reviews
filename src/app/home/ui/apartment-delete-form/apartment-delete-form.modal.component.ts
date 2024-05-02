import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	computed,
	effect,
	inject,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApartmentService } from 'src/app/shared/services/apartment/apartment.service';
// Angular material components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DeleteApartment } from 'src/app/shared/models/apartment.model';

@Component({
	selector: 'app-apartment-delete',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatCardModule],
	templateUrl: './apartment-delete-form.modal.component.html',
	styleUrls: ['./apartment-delete-form.modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentDeleteFormModalComponent {
	apartmentService = inject(ApartmentService);
	apartment = computed(() =>
		this.apartmentService
			.apartments()
			.find(apart => apart.id === this.apartmentData.id)
	);
	close = signal(false);

	constructor(
		public dialogRef: MatDialogRef<ApartmentDeleteFormModalComponent>,
		@Inject(MAT_DIALOG_DATA) private apartmentData: DeleteApartment
	) {
		effect(() => {
			if (!this.apartment() && this.close()) {
				this.dialogRef.close();
			}
		});
	}

	confirmDelete() {
		this.apartmentService.deleteApartment$.next(this.apartmentData);
		this.close.set(true);
	}

	rejectDelete() {
		this.dialogRef.close();
	}
}
