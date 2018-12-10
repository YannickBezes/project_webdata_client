import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

	private subscriptions: Subscription[] = []
	services: object[] = []

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.subscriptions.push(this.api.get_services().subscribe(res => {
			if (res["status"] === "success") {
				this.services = res['data']
			}
		}))
	}

	onToSearch(keyword: string) {
		if (keyword) {
			this.subscriptions.push(this.api.get_services_by_keyword(keyword).subscribe(res => {
				if (res["status"] === "success")
					this.services = res["data"]
			}))
		} else {
			this.subscriptions.push(this.api.get_services().subscribe(res => {
				if (res["status"] === "success")
					this.services = res["data"]
			}))
		}
	}

	onToSearchDate(date: string) {
		if (date) {
			this.subscriptions.push(this.api.get_services_by_date(date).subscribe(res => {
				if (res["status"] === "success")
					this.services = res["data"]
			}))
		} else {
			this.subscriptions.push(this.api.get_services().subscribe(res => {
				if (res["status"] === "success")
					this.services = res["data"]
			}))
		}
	}

	ngOnDestroy() {
		// Unsubscribe each subscription to avoid leak memory
		this.subscriptions.forEach(sub => {
			sub.unsubscribe()
		})
	}

}
