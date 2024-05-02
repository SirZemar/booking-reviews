import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
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
import { ApartmentStatusEnum } from 'src/app/shared/models/apartment-status.model';
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

	form = this.fb.group({
		id: new FormControl(
			{ value: this.apartmentData.id, disabled: true },
			Validators.required
		),
		name: new FormControl(this.apartmentData.name),
	});

	private close = signal(false);
	apartment = computed(() =>
		this.apartmentService
			.apartments()
			.find(apart => apart.id === this.apartmentData.id)
	);

	constructor(
		public dialogRef: MatDialogRef<ApartmentEditFormModalComponent>,
		@Inject(MAT_DIALOG_DATA) private apartmentData: EditApartment
	) {
		effect(() => {
			if (
				this.apartment()?.status === ApartmentStatusEnum.READY &&
				this.close()
			) {
				this.dialogRef.close();
			}
		});
	}

	onSubmit() {
		const name = this.form.value.name;
		this.apartmentService.editApartment$.next({
			id: this.apartmentData.id,
			name: name ? name : this.apartmentData.id,
		});
		this.close.set(true);
	}

	requestCancel() {
		this.dialogRef.close();
	}
}
