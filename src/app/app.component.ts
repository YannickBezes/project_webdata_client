import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	subscription: Subscription[]

	constructor(private api: ApiService) { }

	ngOnInit() { }

	public async login() {
		const connected = await this.api.login('hoover.dalton@duoflex.com', 'password')
		if (connected) {
			this.subscription.push(this.api.get_members().subscribe(data => { }))
		}
	}

	ngOnDestroy() {
		// Unsubscribe each subscription to avoid leak memory
		this.subscription.forEach(sub => {
			sub.unsubscribe()
		})
	}
}
