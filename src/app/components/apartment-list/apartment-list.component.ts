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
import { SortApartmentsPipe } from 'src/app/pipes/sortApartments/sort-apartments.pipe';
import { Apartment } from 'src/app/models/apartment.model';
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
	@Output() updateItem = new EventEmitter<any>();
	@Output() editItem = new EventEmitter<[Apartment['id'], Apartment['name']]>();
	@Output() deleteItem = new EventEmitter<Apartment['id']>();
}
