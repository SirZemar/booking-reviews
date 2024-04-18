import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import {
	MatDialog,
	MatDialogRef,
	MatDialogConfig,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	private dialog = inject(MatDialog);

	openDialog<T>(
		component: ComponentType<T>,
		config?: MatDialogConfig
	): MatDialogRef<T> {
		return this.dialog.open<T>(component, config);
	}

	afterClosed<T>(dialogRef: MatDialogRef<T>): Observable<unknown> {
		return dialogRef.afterClosed();
	}
}
