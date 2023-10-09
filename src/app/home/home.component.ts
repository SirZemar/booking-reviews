import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [SearchBarComponent],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
