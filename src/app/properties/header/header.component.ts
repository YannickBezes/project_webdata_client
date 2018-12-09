import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	admin: boolean = false
	connected: boolean = false
	open: boolean = false
	constructor() { }

	ngOnInit() {
		this.admin = this.is_admin()
	}

	is_admin() {
		let user: Object = JSON.parse(localStorage.getItem('user'))
		if (user != null) {
			this.connected = true;
			return user['role'] === 'admin'
		}
		return false
	}

}
