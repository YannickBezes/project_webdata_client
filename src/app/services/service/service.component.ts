import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription, Subject } from 'rxjs'

import { ApiService } from '../../api.service'

@Component({
	selector: 'app-service',
	templateUrl: './service.component.html',
	styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
	subscriptions: Subscription[] = []
	item: object
	successAddUse: Subject<boolean> = new Subject<boolean>()
	constructor(private route: ActivatedRoute, private api: ApiService) { }

	ngOnInit() {
		this.subscriptions.push(this.route.params.subscribe(data => {
			this.subscriptions.push(this.api.get_service(data['_id']).subscribe(res => {
				if (res['status'] === 'success') {
					this.item = res['data']				}
			}))
		}))
	}

	onDisponibilitySelected(date: string) {
		let user: object = { ...this.api.current_user_value }
		delete user['password']
		delete user['role']
		delete user['_id']
		this.subscriptions.push(this.api.update_service_uses(this.item['_id'], { user, disponibility: date }).subscribe(res => {
			this.successAddUse.next(res['status'] === 'success')
		}))
	}


	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}
}
