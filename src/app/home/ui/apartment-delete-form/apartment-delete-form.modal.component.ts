import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	inject,
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

	constructor(
		public dialogRef: MatDialogRef<ApartmentDeleteFormModalComponent>,
		@Inject(MAT_DIALOG_DATA) private apartmentData: DeleteApartment
	) {}

	confirmDelete() {
		this.apartmentService.deleteApartment$.next(this.apartmentData);
		this.dialogRef.close(); // TODO Should wait for status to complete deletion
	}

	rejectDelete() {
		this.dialogRef.close();
	}
}
