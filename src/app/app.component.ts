import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor(private api: ApiService) { }

	ngOnInit() { }

	public async login() {
		const connected = await this.api.login('hoover.dalton@duoflex.com', 'password')
		if (connected) {
			this.api.get_members().subscribe(data => { })
		}
	}

}
