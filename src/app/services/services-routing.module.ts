import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ServicesComponent } from './services.component'
import { ServiceComponent } from './service/service.component'

const routes: Routes = [
	{ path: '', component: ServicesComponent },
	{ path: 'service/:_id', component: ServiceComponent }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ServicesRoutingModule { }
