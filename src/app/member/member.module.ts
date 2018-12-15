import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlatpickrModule } from 'angularx-flatpickr'

import { MemberRoutingModule } from './member-routing.module'
import { PropertiesModule } from '../properties/properties.module'
import { ServicesComponent } from './services/services.component'
import { MemberComponent } from './member.component'
import { PropertiesComponent } from './properties/properties.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EditComponent } from './edit/edit.component'

@NgModule({
	declarations: [
		ServicesComponent,
		MemberComponent,
		PropertiesComponent,
		EditComponent
	],
	imports: [
		CommonModule,
		MemberRoutingModule,
		PropertiesModule,
		ReactiveFormsModule,
		FormsModule,
		FlatpickrModule.forRoot()
	]
})
export class MemberModule { }
