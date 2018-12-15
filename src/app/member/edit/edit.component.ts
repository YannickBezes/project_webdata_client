import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ApiService } from 'src/app/api.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CalendarEvent } from 'calendar-utils'
import { Subject, Subscription } from 'rxjs'

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = []
	item: object
	registerForm: FormGroup
	category: string
	events: CalendarEvent[] = []
	display_property: boolean = false
	display_service: boolean = false
	message: object
	loading = false
	submitted = false
	disponibilities: object[] = []
	sucessUpdate: Subject<any> = new Subject<any>()

	constructor(private api: ApiService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

	// convenience getter for easy access to form fields
	get form() { return this.registerForm.controls }

	ngOnInit() {
		this.subscriptions.push(this.route.params.subscribe(data => {
			this.category = data['category']
			if (data['category'] === 'property') {
				this.subscriptions.push(this.api.get_property(data['_id']).subscribe(res => {
					if (res['status'] === 'success') {
						this.item = res['data']
						this.registerForm = this.formBuilder.group({
							name: [this.item['name'], Validators.required],
							description: [this.item['description'], Validators.required],
							url_image: [this.item['url_image']],
							keywords: [this.item['keywords'].join(',')],
							price: [this.item['price'], Validators.required]
						})
						this.parse_disponibilities()
						this.display_property = true
					}
				}))
			} else {
				this.subscriptions.push(this.api.get_service(data['_id']).subscribe(res => {
					if (res['status'] === 'success') {
						this.item = res['data']
						this.registerForm = this.formBuilder.group({
							name: [this.item['name'], Validators.required],
							description: [this.item['description'], Validators.required],
							keywords: [this.item['keywords'].join(',')],
						})
						this.parse_disponibilities()
						this.display_service = true
					}
				}))
			}
		}))

		this.subscriptions.push(this.sucessUpdate.subscribe(data => {
			this.parse_disponibilities() // to refresh date
		}))
	}

	parse_disponibilities() {
		this.disponibilities = []
		this.item['disponibilities'].forEach(el => {
			let exist = false
			this.item['uses'].forEach(use => {
				if (use['disponibility'] === el)
					exist = true
			})
			if (!exist) {
				this.disponibilities.push({
					date: new Date(el.split(' ')[0] + ' ' + (el.split(' ')[1] === 'AM' ? "00:00" : "12:00"))
				})
			}
		})
	}

	update() {
		this.submitted = true
		if (this.registerForm.valid && this.disponibilities.length > 0) {
			let item: object = { ...this.registerForm.value }

			// Parse keywords
			item['keywords'] = item['keywords'].split(',')

			// Parse disponibilities
			// Get used disponibilities
			item['disponibilities'] = []
			this.item['disponibilities'].forEach(el => {
				this.item['uses'].forEach(use => {
					if (use['disponibility'] === el)
						item['disponibilities'].push(el)
				})
			})
			// Add unused disponibilities
			this.disponibilities.forEach(el => {
				let date = el['date'].toLocaleString("en")
				item['disponibilities'].push(`${date.split(', ')[0]} ${date.split(' ')[2]}`)
			})

			this.loading = true
			item['_id'] = this.item['_id']
			if (this.category === 'property') {
				this.api.update_property(item).subscribe(res => {
					this.loading = false
					if (res['status'] == "success") {
						this.message = { type: 'success', text: 'Modification réussi' }
						setTimeout(() => this.message = null, 1500) // Clear message
						this.item = res['data']
						this.sucessUpdate.next()
					} else
						this.message = { type: 'error', text: res['message'] }
				})
			} else {
				console.log(item)
				this.subscriptions.push(this.api.update_service(item).subscribe(res => {
					this.loading = false
					if (res['status'] == "success") {
						this.message = { type: 'success', text: 'Modification réussi' }
						setTimeout(() => this.message = null, 1500) // Clear message
						this.item = res['data']
						this.sucessUpdate.next()
					} else
						this.message = { type: 'error', text: res['message'] }
				}))
			}
		}
	}

	addEvent() {
		this.disponibilities.push({
			date: null
		})
	}

	eventTimechanged() {
		let new_dispo = []
		this.item['disponibilities'].forEach(el => {
			this.item['uses'].forEach(use => {
				if (use['disponibility'] === el)
					new_dispo.push(el)
			})
		})
		// Add unused disponibilities
		this.disponibilities.forEach(el => {
			let date = el['date'].toLocaleString("en")
			new_dispo.push(`${date.split(', ')[0]} ${date.split(' ')[2]}`)
		})
		
		this.item['disponibilities'] = new_dispo
		this.sucessUpdate.next()
	}

	remove(index: number) {
		this.disponibilities.splice(index, 1)
		this.update()
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}
}
