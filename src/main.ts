import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
	providers: [
		provideHttpClient(),
		importProvidersFrom(RouterModule.forRoot(appRoutes)),
		importProvidersFrom(BrowserAnimationsModule),
	],
}).catch((err) => console.error(err));
