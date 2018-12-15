import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AdminComponent } from './admin.component'
import { MembersListComponent } from './members-list/members-list.component'
import { PropertiesListComponent } from './properties-list/properties-list.component'
import { ServicesListComponent } from './services-list/services-list.component'

const routes: Routes = [
	{ path: '', component: AdminComponent },
	{ path: 'members-list', component: MembersListComponent },
	{ path: 'properties-list', component: PropertiesListComponent },
	{ path: 'services-list', component: ServicesListComponent }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
