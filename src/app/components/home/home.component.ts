import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
// Components
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ApartmentListComponent } from '../apartment-list/apartment-list.component';
// Services
import { ApartmentService } from 'src/app/services/apartment/apartment.service';
import { SearchService } from 'src/app/services/search/search.service';
import { Apartment } from 'src/app/models/apartment.model';
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
