import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplayMemberComponent } from './display-member/display-member.component';

import { ScrollDispatchModule } from '@angular/cdk/scrolling'

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
