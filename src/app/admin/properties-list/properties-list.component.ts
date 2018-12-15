import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit {
	private subscriptions: Subscription[] = []
	properties: object[] = []
	message: object

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.subscriptions.push(this.api.get_properties().subscribe(res => {
			if (res["status"] === "success") {
				this.properties = res['data']
			}
		}))
	}

	delete_property(id: string) {
		this.api.delete_property(id).subscribe(res => {
			if (res['status'] == "success") {
				this.message = { type: 'success', text: 'Modification réussi' }
			} else
				this.message = { type: 'error', text: res['message'] }
		})
		// Update properties
		let new_properties = []
		this.properties.forEach(el => {
			if (el['_id'] != id)
				new_properties.push(el)
		})
		this.properties = new_properties
	}


}
