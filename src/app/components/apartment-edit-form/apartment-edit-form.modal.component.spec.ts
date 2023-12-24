import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentEditFormModalComponent } from './apartment-edit-form.modal.component';

describe('ApartmentEditFormModalComponent', () => {
  let component: ApartmentEditFormModalComponent;
  let fixture: ComponentFixture<ApartmentEditFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApartmentEditFormModalComponent]
    });
    fixture = TestBed.createComponent(ApartmentEditFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
