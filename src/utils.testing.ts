import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export async function runOnPushDetection<T>(fixture: ComponentFixture<T>) {
	const changeDetectorRef =
		fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
	changeDetectorRef.detectChanges();
	return fixture.whenStable();
}
