import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ServicesRoutingModule } from './services-routing.module'
import { ServicesComponent } from './services.component'
import { PropertiesModule } from '../properties/properties.module'
import { ServiceComponent } from './service/service.component'

@NgModule({
	declarations: [ServicesComponent, ServiceComponent],
	imports: [
		CommonModule,
		ServicesRoutingModule,
		PropertiesModule
	]
})
export class ServicesModule { }
