import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ScrollDispatchModule } from '@angular/cdk/scrolling'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { CalendarModule, DateAdapter } from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'

import { ShopComponent } from './shop/shop.component'
import { HeaderComponent } from './header/header.component'
import { SearchComponent } from './search/search.component'
import { ItemComponent } from './item/item.component'
import { PropertiesRoutingModule } from './properties-routing.module'
import { PropertiesComponent } from './properties.component'
import { PropertyComponent } from './property/property.component'
import { CardComponent } from './card/card.component'
import { DisponibilityComponent } from './disponibility/disponibility.component'

@NgModule({
	declarations: [
		HeaderComponent,
		SearchComponent,
		ShopComponent,
		PropertiesComponent,
		ItemComponent,
		PropertyComponent,
		CardComponent,
		DisponibilityComponent
	],
	imports: [
		CommonModule,
		PropertiesRoutingModule,
		FormsModule,
		ScrollDispatchModule,
		MatDatepickerModule,
		MatInputModule,
		NgbModalModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		})
	],
	exports: [
		HeaderComponent,
		ShopComponent,
		SearchComponent,
		ItemComponent,
		CardComponent,
		DisponibilityComponent
	]
})
export class PropertiesModule { }
