import { Routes } from '@angular/router';

export const appRoutes: Routes = [
	{
		path: 'home',
		loadComponent: () =>
			import('./home/home.component').then((m) => m.HomeComponent),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},
];
