import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { ApiService } from '../../api.service'

@Component({
	selector: 'app-display-member',
	templateUrl: './display-member.component.html',
	styleUrls: ['./display-member.component.css']
})
export class DisplayMemberComponent implements OnInit, OnDestroy {
	@Input() member: object

	subscriptions: Subscription[] = []
	ratio: object = { ratio: 0 }

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.subscriptions.push(this.api.get_member_ratio(this.member['_id']).subscribe(res => {
			if (res["status"] === "success") {
				this.ratio = res['data']
			}
		}))
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}

}
