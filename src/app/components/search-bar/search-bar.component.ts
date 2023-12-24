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
  FormGroupDirective,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from 'src/app/services/search/search.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { ApartmentAddFormModalComponent } from '../apartment-add-form/apartment-add-form.modal.component';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';

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
  dialogService = inject(DialogService);

  reviewsService = inject(ReviewsService);
  form = this.fb.group({
    apartmentId: new FormControl(''),
  });

  onSearch(): void {
    // TODO Forcing type must be reviewed
    const searchTerm = this.form.get('apartmentId')?.value;
    this.searchService.setSearchTerm(searchTerm!);
  }

  onSubmit(): void {
    const apartmentId = this.form.value.apartmentId;
    if (apartmentId) {
      this.openDialog();
      this.formDir.resetForm();
      this.onSearch();
    }
  }

  onReset(): void {
    this.formDir.resetForm();
    this.onSearch();
  }

  openDialog(): void {
    const dialogRef =
      this.dialogService.openDialog<ApartmentAddFormModalComponent>(
        ApartmentAddFormModalComponent,
        {
          data: { id: this.form.get('apartmentId')?.value },
        }
      );
  }
}
