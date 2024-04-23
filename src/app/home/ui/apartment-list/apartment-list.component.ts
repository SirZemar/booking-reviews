import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentItemComponent } from '../apartment-item/apartment-item.component';
import { SortApartmentsPipe } from 'src/app/shared/pipes/sortApartments/sort-apartments.pipe';
import {
	Apartment,
	DeleteApartment,
	EditApartment,
} from 'src/app/shared/models/apartment.model';
@Component({
	selector: 'app-apartment-list',
	templateUrl: './apartment-list.component.html',
	styleUrls: ['./apartment-list.component.scss'],
	imports: [CommonModule, ApartmentItemComponent, SortApartmentsPipe],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentListComponent {
	@Input({ required: true }) apartments: Apartment[] = [];
	@Output() launchBookingPage = new EventEmitter<Apartment['id']>();
	@Output() updateItem = new EventEmitter<
		[Apartment['id'], WritableSignal<boolean>]
	>(); //TODO refactor signal status
	@Output() editItem = new EventEmitter<EditApartment>();
	@Output() deleteItem = new EventEmitter<DeleteApartment>();
}
