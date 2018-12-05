import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/api.service';

@Component({
	selector: 'app-property',
	templateUrl: './property.component.html',
	styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = []
	item: object
	constructor(private route: ActivatedRoute, private api: ApiService) { }

	ngOnInit() {
		this.subscriptions.push(this.route.params.subscribe(data => {
			this.subscriptions.push(this.api.get_property(data['_id']).subscribe(res => {
				if (res['status'] === 'success') {
					this.item = res['data']
				}
			}))
		}))
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => {
			sub.unsubscribe()
		});
	}
}
