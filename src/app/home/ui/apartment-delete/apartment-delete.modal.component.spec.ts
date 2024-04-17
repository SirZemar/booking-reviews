import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDeleteModalComponent } from './apartment-delete.modal.component';

describe('ApartmentDeleteModalComponent', () => {
	let component: ApartmentDeleteModalComponent;
	let fixture: ComponentFixture<ApartmentDeleteModalComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApartmentDeleteModalComponent],
		});
		fixture = TestBed.createComponent(ApartmentDeleteModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
