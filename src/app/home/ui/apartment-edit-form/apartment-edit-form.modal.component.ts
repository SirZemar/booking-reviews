import {
	ChangeDetectionStrategy,
	Component,
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
import { ApartmentService } from 'src/app/shared/services/apartment/apartment.service';
import { EditApartment } from 'src/app/shared/models/apartment.model';

@Component({
	selector: 'app-apartment-edit-form',
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
	templateUrl: './apartment-edit-form.modal.component.html',
	styleUrls: ['./apartment-edit-form.modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentEditFormModalComponent {
	fb = inject(FormBuilder);
	apartmentService = inject(ApartmentService);

	isLoading = signal(false); // TODO Replace for apartment status

	form = this.fb.group({
		id: new FormControl(
			{ value: this.apartmentData.id, disabled: true },
			Validators.required
		),
		name: new FormControl(this.apartmentData.name),
	});

	constructor(
		public dialogRef: MatDialogRef<ApartmentEditFormModalComponent>,
		@Inject(MAT_DIALOG_DATA) private apartmentData: EditApartment
	) {}

	onSubmit() {
		const name = this.form.get('name')?.value;
		this.apartmentService.editApartment$.next({
			id: this.apartmentData.id,
			name: name ? name : this.apartmentData.id,
		});

		this.dialogRef.close(); // TODO should wait for apartment patch
	}

	requestCancel() {
		this.dialogRef.close();
	}
}
