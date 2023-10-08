import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export async function runOnPushDetection(fixture: ComponentFixture<any>) {
	const changeDetectorRef =
		fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
	changeDetectorRef.detectChanges();
	return fixture.whenStable();
}
