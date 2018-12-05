import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
	{ path: 'properties', loadChildren: './properties/properties.module#PropertiesModule' },
	{ path: 'services', loadChildren: './services/services.module#ServicesModule' },
	{ path: '**', redirectTo: 'properties'}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
