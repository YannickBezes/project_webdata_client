import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{ path: 'properties', loadChildren: './properties/properties.module#PropertiesModule' },
	{ path: 'services', loadChildren: './services/services.module#ServicesModule' },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent},
	{ path: '**', redirectTo: 'properties'}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
