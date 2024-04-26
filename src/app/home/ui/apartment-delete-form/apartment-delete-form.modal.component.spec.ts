import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDeleteFormModalComponent } from './apartment-delete-form.modal.component';

describe('ApartmentDeleteModalComponent', () => {
	let component: ApartmentDeleteFormModalComponent;
	let fixture: ComponentFixture<ApartmentDeleteFormModalComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApartmentDeleteFormModalComponent],
		});
		fixture = TestBed.createComponent(ApartmentDeleteFormModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
