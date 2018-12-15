import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { ApiService } from '../../api.service'

@Component({
	selector: 'app-services-list',
	templateUrl: './services-list.component.html',
	styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = []
	services: object[] = []
	message: object

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.subscriptions.push(this.api.get_services().subscribe(res => {
			if (res["status"] === "success") {
				this.services = res['data']
			}
		}))
	}

	delete_service(id: string) {
		this.subscriptions.push(this.api.delete_service(id).subscribe(res => {
			if (res['status'] == "success") {
				// Update services
				let new_services = []
				this.services.forEach(el => {
					if (el['_id'] != id)
					new_services.push(el)
				})
				this.services = new_services
				
				this.message = { type: 'success', text: 'Modification réussi' }
				setTimeout(() => this.message = null, 1500) // Clear message
			} else
				this.message = { type: 'error', text: res['message'] }
		}))
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}
}
