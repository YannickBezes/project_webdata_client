import { BrowserModule } from '@angular/platform-browser'
import { NgModule, LOCALE_ID } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PropertiesModule } from './properties/properties.module'
import { ServicesModule } from './services/services.module'
import { MatNativeDateModule } from '@angular/material/core'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

registerLocaleData(localeFr, 'fr');

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		PropertiesModule,
		ServicesModule,
		BrowserAnimationsModule,
		MatNativeDateModule,
		ReactiveFormsModule
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr'}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
