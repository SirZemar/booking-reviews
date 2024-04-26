import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
// Components
import { SearchBarComponent } from '../shared/ui/search-bar/search-bar.component';
import { ApartmentListComponent } from './ui/apartment-list/apartment-list.component';
// Services
import { ApartmentService } from 'src/app/shared/services/apartment/apartment.service';
import { SearchService } from 'src/app/shared/services/search/search.service';
import {
	Apartment,
	DeleteApartment,
	EditApartment,
	UpdateApartment,
} from 'src/app/shared/models/apartment.model';
import { ReviewsService } from 'src/app/shared/services/reviews/reviews.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
// Modal components
import { ApartmentEditFormModalComponent } from './ui/apartment-edit-form/apartment-edit-form.modal.component';
import { ApartmentDeleteFormModalComponent } from './ui/apartment-delete-form/apartment-delete-form.modal.component';
@Component({
	selector: 'app-home',
	standalone: true,
	imports: [SearchBarComponent, CommonModule, ApartmentListComponent],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	apartmentService = inject(ApartmentService);
	searchService = inject(SearchService);
	reviewsService = inject(ReviewsService);

	dialogService = inject(DialogService);

	searchTerm = toSignal(this.searchService.search$, { initialValue: '' });

	apartments = computed(() => {
		this.searchTerm() ?? '';
		return this.apartmentService.apartments().filter(apartment => {
			return (
				apartment.id.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
				apartment.name.toLowerCase().includes(this.searchTerm().toLowerCase())
			);
		});
	});

	navigateToUrl(id: Apartment['id']) {
		window.open(
			`https://www.booking.com/hotel/pt/${id}.pt-pt.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaLsBiAEBmAEfuAEHyAEM2AEB6AEB-AEMiAIBqAIDuAKRo5usBsACAdICJDYwMzQ4ZDdjLTM5ZDUtNDMxZC05ZGZkLTY2NzQxNDY0YmYzNNgCBuACAQ&sid=ad4661baf04ea1012e4c76eaa4bde283&dest_id=-2173088;dest_type=city;dist=0;group_adults=1;group_children=0;hapos=1;hpos=1;no_rooms=1;req_adults=1;req_children=0;room1=A;sb_price_type=total;sr_order=popularity;srepoch=1703336399;srpvid=59a95b638872000f;type=total;ucfs=1&#hotelTmpl`,
			'_blank'
		);
	}

	onUpdate(apartmentData: UpdateApartment) {
		this.reviewsService.updateReviews$.next(apartmentData);
	}

	onEdit(apartmentData: EditApartment) {
		this.dialogService.openDialog<ApartmentEditFormModalComponent>(
			ApartmentEditFormModalComponent,
			{
				data: { id: apartmentData.id, name: apartmentData.name },
			}
		);
	}

	onDelete(apartmentData: DeleteApartment) {
		this.dialogService.openDialog<ApartmentDeleteFormModalComponent>(
			ApartmentDeleteFormModalComponent,
			{
				data: { id: apartmentData.id },
			}
		);
	}
}
