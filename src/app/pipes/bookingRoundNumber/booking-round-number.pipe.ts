import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingRoundNumber',
  standalone: true,
})
export class BookingRoundNumberPipe implements PipeTransform {
  transform(value: number): string {
    const valueTimes10 = value * 10;
    let roundAverage = '';

    if (valueTimes10 - Math.floor(valueTimes10) > 0.5) {
      roundAverage = (Math.floor(valueTimes10) / 10 + 0.1).toFixed(1);
    } else {
      roundAverage = (Math.floor(valueTimes10) / 10).toFixed(1);
    }
    return roundAverage;
  }
}
