import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from '../api.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-member',
	templateUrl: './member.component.html',
	styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = []
	registerForm: FormGroup
	loading = false
	submitted = false
	message: object

	constructor(private formBuilder: FormBuilder, private api: ApiService) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			firstname: [this.api.current_user_value['firstname']],
			lastname: [this.api.current_user_value['lastname']],
			email: [this.api.current_user_value['email']],
			password: ['', Validators.minLength(6)],
			city: [this.api.current_user_value['city']]
		})		
	}

	// convenience getter for easy access to form fields
	get form() { return this.registerForm.controls }

	onSubmit() {
		this.submitted = true

		if (this.registerForm.valid) {
			this.loading = true
			let user = { ...this.registerForm.value }
			user['_id'] = this.api.current_user_value['_id'] // Copy id
			if (user['password'] == "")
				delete user["password"]
			this.subscriptions.push(this.api.update_member(user).subscribe(res => {
				this.loading = false
				if (res['status'] == "success") {
					this.message = { type: 'success', text: 'Modification réussi' }
					this.api.current_user_subject.next({ ...res['data']['user'], token: res['data']['token'] })
				} else
					this.message = { type: 'error', text: res['message'] }
			}))
		}
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}
}
