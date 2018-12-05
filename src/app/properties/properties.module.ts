import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ScrollDispatchModule } from '@angular/cdk/scrolling'

import { ShopComponent } from './shop/shop.component'
import { HeaderComponent } from './header/header.component'
import { SearchComponent } from './search/search.component'
import { ItemComponent } from './item/item.component'
import { PropertiesRoutingModule } from './properties-routing.module'
import { PropertiesComponent } from './properties.component'
import { PropertyComponent } from './property/property.component'

@NgModule({
	declarations: [
		HeaderComponent,
		SearchComponent,
		ShopComponent,
		PropertiesComponent,
		ItemComponent,
		PropertyComponent
	],
	imports: [
		CommonModule,
		PropertiesRoutingModule,
		FormsModule,
		ScrollDispatchModule
	],
	exports: [
		HeaderComponent,
		ShopComponent,
		SearchComponent,
		ItemComponent
	]
})
export class PropertiesModule { }
