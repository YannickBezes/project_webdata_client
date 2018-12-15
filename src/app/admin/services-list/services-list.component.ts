import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
	private subscriptions: Subscription[] = []
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
		this.api.delete_service(id).subscribe(res => {
			if (res['status'] == "success") {
				this.message = { type: 'success', text: 'Modification réussi' }
			} else
				this.message = { type: 'error', text: res['message'] }
		})
		// Update services
		let new_services = []
		this.services.forEach(el => {
			if (el['_id'] != id)
				new_services.push(el)
		})
		this.services = new_services
	}

}
