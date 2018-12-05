import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesComponent } from './properties.component';
import { PropertyComponent } from './property/property.component';

const routes: Routes = [
	{ path: '', component: PropertiesComponent },
	{ path: 'property/:_id', component: PropertyComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PropertiesRoutingModule { }
