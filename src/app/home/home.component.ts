import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
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
		this.subscriptions.push(this.api.get_properties_by_keyword(keyword).subscribe(res => {
			console.log(res)
			if (res["status"] === "success") {
				this.properties = res['data']
			}
		}))
	}

	ngOnDestroy() {
		// Unsubscribe each subscription to avoid leak memory
		this.subscriptions.forEach(sub => {
			sub.unsubscribe()
		})
	}
}
