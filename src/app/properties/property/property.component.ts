import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription, Subject } from 'rxjs'
import { ActivatedRoute } from '@angular/router'

import { ApiService } from 'src/app/api.service'

@Component({
	selector: 'app-property',
	templateUrl: './property.component.html',
	styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = []
	item: object
	display_image: boolean = true
	successAddUse: Subject<boolean> = new Subject<boolean>()
	
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
	onDisponibilitySelected(date: string) {
		let user: object = { ...this.api.current_user_value }
		delete user['password']
		delete user['role']
		delete user['_id']
		this.subscriptions.push(this.api.update_property_uses(this.item['_id'], {
			user,
			disponibility: date
		}).subscribe(res => {
			this.successAddUse.next(res['status'] === 'success')
		}))
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}
}
