import {
	ChangeDetectionStrategy,
	Component,
	ViewChild,
	inject,
} from '@angular/core';
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
import { SearchService } from 'src/app/services/search/search.service';

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
  label = 'Booking Page Name';
  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  fb = inject(FormBuilder);
  searchService = inject(SearchService);

  form = this.fb.group({
    apartmentId: new FormControl(''),
  });

  onSearch() {
		// TODO Forcing type must be reviewed
    const searchTerm = this.form.get('apartmentId')?.value;
    this.searchService.setSearchTerm(searchTerm!);
  }

  async onSubmit() {
    const pageName = this.form.value.apartmentId;

    if (pageName) {
      // const reviewRates = await getReviewRates(pageName);
      // console.log(reviewRates);

      this.formDir.resetForm();
    }
  }

  onReset() {
    this.formDir.resetForm();
    this.onSearch();
  }
}
