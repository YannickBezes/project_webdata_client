import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-properties',
	templateUrl: './properties.component.html',
	styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
	properties: object[]
	message: object
	display_form: boolean = false
	loading = false
	submitted = false
	registerForm: FormGroup;
	disponibilities: object[] = []

	constructor(private api: ApiService, private formBuilder: FormBuilder, private router: Router) { }

	// convenience getter for easy access to form fields
	get form() { return this.registerForm.controls; }

	ngOnInit() {
		this.api.get_properties_by_email(this.api.current_user_value['email']).subscribe(res => {
			if (res['status'] === 'success')
				this.properties = res['data']
		})
		
		this.registerForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: ['', Validators.required],
			url_image: [''],
			keywords: [''],
			price: ['', Validators.required]
		});
	}

	add() {
		this.submitted = true;
		if (this.registerForm.valid && this.disponibilities.length > 0) {
			let property: object = { ...this.registerForm.value }
			property['uses'] = []
			let user = this.api.current_user_value
			delete user['_id']
			delete user['token']
			property['owner'] = { ...user }

			// Parse keywords
			property['keywords'] = property['keywords'].split(',')

			// Parse disponibilities
			property['disponibilities'] = []
			this.disponibilities.forEach(el => {
				let date = el['date'].toLocaleString("en")
				property['disponibilities'].push(`${date.split(', ')[0]} ${date.split(' ')[2]}`)
			})

			this.loading = true;
			this.api.add_property(property).subscribe(res => {
				this.loading = false;
				if (res['status'] == "success") {
					this.message = { type: 'success', text: 'Ajout réussi' }
					this.properties.push(res['data'])
					setTimeout(() => {
						this.message = null
					}, 1500);
				} else
					this.message = { type: 'error', text: res['message'] }
			})
		}
	}

	addEvent() {
		this.disponibilities.push({
			date: null
		})
	}

	/**
	 * Delete a property
	 * @param id id of the property to delete
	 */
	remove(id: string) {
		this.api.delete_property(id).subscribe(res => {
			if (res['status'] === "success") {
				this.message = { type: "success", text: "Bien supprimé" }

				// Update properties
				let new_properties = []
				this.properties.forEach(el => {
					if (el['_id'] != id)
						new_properties.push(el)
				})
				this.properties = new_properties
				// Delete message after 1.5s
				setTimeout(() => {
					this.message = null
				}, 1500);
			}
		})
	}

	edit(id: string) {
		this.router.navigate([`/account/edit/property/${id}`])
	}

}
