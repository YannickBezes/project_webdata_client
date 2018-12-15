import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from 'src/app/api.service'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = []
	services: object[] = []
	message: object
	display_form: boolean = false
	loading = false
	submitted = false
	registerForm: FormGroup
	disponibilities: object[] = []

	constructor(private api: ApiService, private formBuilder: FormBuilder, private router: Router) { }

	// convenience getter for easy access to form fields
	get form() { return this.registerForm.controls }

	ngOnInit() {
		this.subscriptions.push(this.api.get_services_by_email(this.api.current_user_value['email']).subscribe(res => {
			if (res['status'] === 'success')
				this.services = res['data']
		}))

		this.registerForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: ['', Validators.required],
			keywords: [''],
		})
	}

	add() {
		this.submitted = true
		if (this.registerForm.valid && this.disponibilities.length > 0) {
			let service: object = { ...this.registerForm.value }
			service['uses'] = []
			let user = this.api.current_user_value
			delete user['_id']
			delete user['token']
			service['owner'] = { ...user }

			// Parse keywords
			service['keywords'] = service['keywords'].split(',')

			// Parse disponibilities
			service['disponibilities'] = []
			this.disponibilities.forEach(el => {
				let date = el['date'].toLocaleString("en")
				service['disponibilities'].push(`${date.split(', ')[0]} ${date.split(' ')[2]}`)
			})

			this.loading = true
			this.subscriptions.push(this.api.add_service(service).subscribe(res => {
				this.loading = false
				if (res['status'] == "success") {
					this.message = { type: 'success', text: 'Ajout réussi' }
					this.services.push(res['data'])
					setTimeout(() => {
						this.message = null
					}, 1500)
				} else
					this.message = { type: 'error', text: res['message'] }
			}))
		}
	}

	addEvent() {
		this.disponibilities.push({
			date: null
		})
	}

	/**
	 * Delete a service
	 * @param id id of the service to delete
	 */
	remove(id: string) {
		this.subscriptions.push(this.api.delete_service(id).subscribe(res => {
			if (res['status'] === "success") {
				this.message = { type: "success", text: "Service supprimé" }

				// Update services
				let new_services = []
				this.services.forEach(el => {
					if (el['_id'] != id)
						new_services.push(el)
				})
				this.services = new_services
				// Delete message after 1.5s
				setTimeout(() => {
					this.message = null
				}, 1500)
			}
		}))
	}

	edit(id: string) {
		this.router.navigate([`/account/edit/service/${id}`])
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}
}
