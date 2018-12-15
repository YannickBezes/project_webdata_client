import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { ApiService } from '../../api.service'

@Component({
	selector: 'app-members-list',
	templateUrl: './members-list.component.html',
	styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = []
	members: object[] = []
	message: object

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.subscriptions.push(this.api.get_members().subscribe(res => {
			if (res["status"] === "success") {
				this.members = res['data']
			}
		}))
	}

	delete_user(id: string) {
		this.subscriptions.push(this.api.delete_member(id).subscribe(res => {
			if (res['status'] == "success") {
				// Update members
				let new_members = []
				this.members.forEach(el => {
					if (el['_id'] != id)
						new_members.push(el)
				})
				this.members = new_members
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
