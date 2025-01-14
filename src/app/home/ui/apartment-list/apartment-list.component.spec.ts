import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentListComponent } from './apartment-list.component';

describe('ApartmentListComponent', () => {
	let component: ApartmentListComponent;
	let fixture: ComponentFixture<ApartmentListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApartmentListComponent],
		});
		fixture = TestBed.createComponent(ApartmentListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
