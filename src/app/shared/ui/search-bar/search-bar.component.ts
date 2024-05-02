import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	HostListener,
	Output,
	inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
	FormBuilder,
	ReactiveFormsModule,
	FormsModule,
	FormControl,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from 'src/app/shared/services/search/search.service';
import { AddApartment } from '../../models/apartment.model';

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
	@HostListener('document:keydown.escape') onEscapeKeydownHandler() {
		this.onReset();
	}
	@Output() create = new EventEmitter<AddApartment>();
	fb = inject(FormBuilder);
	searchService = inject(SearchService);
	// dialogService = inject(DialogService);

	label = 'Booking Page Name';

	form = this.fb.group({
		apartmentId: new FormControl('', { nonNullable: true }),
	});

	onSearch(): void {
		const searchTerm = this.form.get('apartmentId')!.value;
		this.searchService.setSearchTerm(searchTerm);
	}

	onSubmit(): void {
		const apartmentId = this.form.value.apartmentId;
		if (apartmentId) {
			this.create.emit({ id: apartmentId, name: '' });
			this.onReset();
		}
	}

	onReset(): void {
		this.form.reset();
		this.onSearch();
	}

	// openDialog(): void {
	// 	this.dialogService.openDialog<ApartmentAddFormModalComponent>(
	// 		ApartmentAddFormModalComponent,
	// 		{
	// 			data: { id: this.form.get('apartmentId')!.value },
	// 		}
	// 	);
	// }
}
