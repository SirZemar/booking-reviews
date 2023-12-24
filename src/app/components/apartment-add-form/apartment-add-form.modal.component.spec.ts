import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentAddFormModalComponent } from './apartment-add-form.modal.component';

describe('ApartmentDetailsModalComponent', () => {
  let component: ApartmentAddFormModalComponent;
  let fixture: ComponentFixture<ApartmentAddFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApartmentAddFormModalComponent],
    });
    fixture = TestBed.createComponent(ApartmentAddFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
