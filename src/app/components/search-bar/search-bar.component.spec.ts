import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms'; // Add this import
import { MatIconModule } from '@angular/material/icon'; // Add this import
import { MatInputModule } from '@angular/material/input'; // Add this import
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { runOnPushDetection } from '../../../utils.testing';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SearchBarComponent,
        FormsModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    runOnPushDetection(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have label equal to string', () => {
    expect(component.label).toBe('Booking Url');
  });

  it('should have an empty value initially', () => {
    expect(component.form.value).toEqual({ bookingUrl: '' });
  });

  it('should accept an input value', () => {
    const inputValue =
      'https://www.booking.com/hotel/pt/oporto-invite-santa-catarina.pt-pt.html?label=operasoft-sdO15-343336&sid=c3c218a3340abeee4743ad1bfb8b49d5&aid=343336&ucfs=1&arphpl=1&dest_id=-2173088&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=2&hapos=2&sr_order=popularity&srpvid=4a4f6783dad000e8&srepoch=1696776224&from_sustainable_property_sr=1&from=searchresults#tab-reviews';
    const inputElement = fixture.debugElement.query(
      By.css('[data-testid=search-form-input]')
    ).nativeElement;

    inputElement.value = inputValue;
    inputElement.dispatchEvent(new Event('input'));

    runOnPushDetection(fixture);
    expect(component.form.value).toEqual({ bookingUrl: inputValue });
  });

  it('should called one time function on form submit', () => {
    const onSubmitMock = jest.fn();
    component.onSubmit = onSubmitMock;

    const formElement = fixture.debugElement.query(
      By.css('[data-testid=search-form]')
    ).nativeElement;

    formElement.dispatchEvent(new Event('submit'));
    runOnPushDetection(fixture);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('should called one time function on form reset ', () => {
    const onSubmitMock = jest.fn();
    component.onReset = onSubmitMock;

    const formElement = fixture.debugElement.query(
      By.css('[data-testid=search-form]')
    ).nativeElement;

    formElement.dispatchEvent(new Event('reset'));
    runOnPushDetection(fixture);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });
});
