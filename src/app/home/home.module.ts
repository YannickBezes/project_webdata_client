import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { HomeRoutingModule } from './home-routing.module'
import { ShopComponent } from './shop/shop.component'
import { HeaderComponent } from './header/header.component'
import { SearchComponent } from './search/search.component'
import { HomeComponent } from './home.component'
import { ItemComponent } from './item/item.component'

@NgModule({
	declarations: [
		HeaderComponent,
		SearchComponent,
		ShopComponent,
		HomeComponent,
		ItemComponent
	],
	imports: [
		CommonModule,
		HomeRoutingModule,
		FormsModule
	]
})
export class HomeModule { }
