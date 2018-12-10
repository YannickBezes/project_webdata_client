import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-properties',
	templateUrl: './properties.component.html',
	styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = []
	properties: object[] = []

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.subscriptions.push(this.api.get_properties().subscribe(res => {
			if (res["status"] === "success") {
				this.properties = res['data']
			}
		}))
	}

	onToSearch(keyword: string) {
		if (keyword) {
			this.subscriptions.push(this.api.get_properties_by_keyword(keyword).subscribe(res => {
				if (res["status"] === "success")
					this.properties = res['data']
			}))
		} else {
			this.subscriptions.push(this.api.get_properties().subscribe(res => {
				if (res["status"] === "success")
					this.properties = res["data"]
			}))
		}
	}

	onToSearchDate(date: string) {
		if (date) {
			this.subscriptions.push(this.api.get_properties_by_date(date).subscribe(res => {
				if (res["status"] === "success")
					this.properties = res["data"]
			}))
		} else {
			this.subscriptions.push(this.api.get_properties().subscribe(res => {
				if (res["status"] === "success")
					this.properties = res["data"]
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
