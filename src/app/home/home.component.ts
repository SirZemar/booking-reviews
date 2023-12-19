import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ApartmentListComponent } from '../apartment-list/apartment-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, ApartmentListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
