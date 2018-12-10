import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	admin: boolean = false
	connected: boolean = false
	open: boolean = false
	constructor(public api: ApiService) { }

	ngOnInit() {
		this.admin = this.is_admin()
	}

	is_admin() {
		if (this.is_connected())
			return this.api.current_user_value['role'] === "admin"
		return false
	}

	is_connected() {
		return this.api.current_user_value != null
	}

	logout() {
		this.api.logout()
	}

}
