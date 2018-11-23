import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'client';
	json: string;
	connected: boolean
	constructor(private api: ApiService) { }

	ngOnInit() {
		this.api.is_connected()
		this.api.is_connected().subscribe(connected => {
			console.log(connected)
			this.connected = connected
		})

		this.api.get_properties().subscribe(data => {
			this.json = JSON.stringify(data)
		})
	}

	public async login() {
		const connected = await this.api.login('hoover.dalton@duoflex.com', 'password')
		if (connected) {
			this.api.get_members().subscribe(data => {
				this.json = JSON.stringify(data)
			})
		}
	}

}
