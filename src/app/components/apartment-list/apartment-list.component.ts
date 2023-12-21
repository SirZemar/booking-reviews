import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApartmentService } from '../../services/apartment/apartment.service';
import { CommonModule } from '@angular/common';
import { ApartmentItemComponent } from '../apartment-item/apartment-item.component';
// import { Apartment } from 'path-to-your-apartment-model'; // Update with the actual path to your model

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
  imports: [CommonModule, ApartmentItemComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentListComponent {
  http = inject(HttpClient);
  apartmentService = inject(ApartmentService);

  apartments$ = this.apartmentService.getFilteredApartments();
}
