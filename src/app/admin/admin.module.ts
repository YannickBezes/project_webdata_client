import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScrollDispatchModule } from '@angular/cdk/scrolling'

import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component'
import { NavbarComponent } from './navbar/navbar.component'
import { DisplayMemberComponent } from './display-member/display-member.component'

@NgModule({
	declarations: [
		AdminComponent,
		NavbarComponent,
		DisplayMemberComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		ScrollDispatchModule
	]
})
export class AdminModule { }
