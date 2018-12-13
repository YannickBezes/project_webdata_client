import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { MemberComponent } from './member.component';
import { PropertiesComponent } from './properties/properties.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
	{ path: '', component: MemberComponent},
	{ path: 'services', component: ServicesComponent },
	{ path: 'properties', component: PropertiesComponent },
	{ path: 'edit/:category/:_id', component: EditComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MemberRoutingModule {}
