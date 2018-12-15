import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { ApiService } from '../api.service'


@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = []
	members: object[] = []

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.subscriptions.push(this.api.get_members().subscribe(res => {
			if (res["status"] === "success") {
				this.members = res['data']
			}
		}))
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}

}
