import { Pipe, PipeTransform } from '@angular/core';
import { Apartment } from 'src/app/models/apartment.model';

@Pipe({
  name: 'sortApartments',
  standalone: true,
})
export class SortApartmentsPipe implements PipeTransform {
  transform(value: Apartment[]): Apartment[] {
    return value.sort((a, b) => a.name.localeCompare(b.name));
  }
}
