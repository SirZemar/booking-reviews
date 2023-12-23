import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDetailsModalComponent } from './apartment-details-modal.component';

describe('ApartmentDetailsModalComponent', () => {
  let component: ApartmentDetailsModalComponent;
  let fixture: ComponentFixture<ApartmentDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApartmentDetailsModalComponent]
    });
    fixture = TestBed.createComponent(ApartmentDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
