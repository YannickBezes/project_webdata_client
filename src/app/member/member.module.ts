import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { PropertiesModule } from '../properties/properties.module';
import { ServicesComponent } from './services/services.component';
import { MemberComponent } from './member.component';
import { PropertiesComponent } from './properties/properties.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ServicesComponent,
		MemberComponent,
		PropertiesComponent
	],
	imports: [
		CommonModule,
		MemberRoutingModule,
		PropertiesModule,
		ReactiveFormsModule
	]
})
export class MemberModule { }
