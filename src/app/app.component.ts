import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = []

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.login()
	}

	public async login() {
		try {
			// const connected = await this.api.login('hoover.dalton@duoflex.com', 'password') // TODO: Remove it when we have create the login component
			// if (connected) {
				// TODO: print a message
			// }
		} catch (error) {
			console.error("Connexion failed")
		}	
	}

	ngOnDestroy() {
		// Unsubscribe each subscription to avoid leak memory
		this.subscriptions.forEach(sub => {
			sub.unsubscribe()
		})
	}
}
