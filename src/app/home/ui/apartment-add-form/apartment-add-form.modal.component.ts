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
import { Subject, concat, delay, of, switchMap } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { AddApartment } from 'src/app/shared/models/apartment.model';
import { ApartmentStatusEnum } from 'src/app/shared/models/apartment-status.model';

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
export class ApartmentAddFormModalComponent {
	fb = inject(FormBuilder);
	apartmentService = inject(ApartmentService);

	apartment = computed(() =>
		this.apartmentService
			.apartments()
			.find(apart => apart.id === this.apartmentData.id)
	);
	private close = signal(false);

	private temporaryMessageSubject = new Subject<string>();
	temporaryMessage$ = this.temporaryMessageSubject.pipe(
		switchMap(value => concat(of(value), of('').pipe(delay(2000))))
	);

	form = this.fb.group({
		id: new FormControl(
			{ value: this.apartmentData.id, disabled: true },
			Validators.required
		),
		name: new FormControl('', { nonNullable: true }),
	});
	constructor(
		public dialogRef: MatDialogRef<ApartmentAddFormModalComponent>,
		@Inject(MAT_DIALOG_DATA) private apartmentData: AddApartment
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
		const name = this.form.get('name')!.value;
		const apartmentExist = this.apartmentService
			.apartments()
			.find(
				apartment =>
					apartment.id.toLowerCase() === this.apartmentData.id.toLowerCase()
			);

		if (apartmentExist) {
			return this.temporaryMessageSubject.next('Apartment already exist!');
		}

		this.apartmentService.addApartment$.next({
			id: this.apartmentData.id,
			name: name.trim() ? name : this.apartmentData.id,
		});
		this.close.set(true);
	}

	requestCancel() {
		this.dialogRef.close();
	}
}
