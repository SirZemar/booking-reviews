import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
	FormBuilder,
	ReactiveFormsModule,
	FormsModule,
	FormControl,
	Validators,
	FormGroupDirective,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-search-bar',
	standalone: true,
	imports: [
		CommonModule,
		MatInputModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule,
	],
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
	label = 'Booking Url';
	@ViewChild(FormGroupDirective)
	private formDir!: FormGroupDirective;

	form = this.fb.group({
		bookingUrl: new FormControl('', Validators.required),
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		this.formDir.resetForm();
	}

	onReset() {
		this.formDir.resetForm();
	}
}
