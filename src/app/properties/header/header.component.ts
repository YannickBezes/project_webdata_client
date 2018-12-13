import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	admin: boolean = false
	connected: boolean = false
	open: boolean = false
	constructor(public api: ApiService, private router: Router) { }

	ngOnInit() {
		this.is_admin()
		this.is_connected()
	}

	is_admin() {
		this.api.is_admin().subscribe(admin => {
			this.admin = admin
		})
	}

	is_connected() {
		this.api.current_user.subscribe(user => {
			if (user) this.connected = true
			else this.connected = false
		})
	}

	logout() {
		this.api.logout()
		this.admin = false
		this.router.navigate(['/'])
	}

}
