import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ApartmentService } from '../../services/apartment/apartment.service';
import { CommonModule } from '@angular/common';
import { ApartmentItemComponent } from '../apartment-item/apartment-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchService } from 'src/app/services/search/search.service';
import { SortApartmentsPipe } from 'src/app/pipes/sortApartments/sort-apartments.pipe';
@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
  imports: [CommonModule, ApartmentItemComponent, SortApartmentsPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentListComponent {
  apartmentService = inject(ApartmentService);
  searchService = inject(SearchService);

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
}
