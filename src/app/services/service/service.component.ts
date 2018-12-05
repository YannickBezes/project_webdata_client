import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-service',
	templateUrl: './service.component.html',
	styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
	subscriptions: Subscription[] = []
	item: object
	constructor(private route: ActivatedRoute, private api: ApiService) { }

	ngOnInit() {
		this.subscriptions.push(this.route.params.subscribe(data => {
			this.subscriptions.push(this.api.get_service(data['_id']).subscribe(res => {
				if (res['status'] === 'success') {
					this.item = res['data']
					console.log(res)
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
