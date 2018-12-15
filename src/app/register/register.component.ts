import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { first } from 'rxjs/operators'

import { ApiService } from '../api.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = []
	registerForm: FormGroup
	loading = false
	submitted = false
	message: object

	constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService) {
		// redirect to home if already logged in
		if (this.api.current_user_subject.value != null) {
			this.router.navigate(['/'])
		}
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
			city: ['', Validators.required],
			role: ['user']
		})
	}

	// convenience getter for easy access to form fields
	get form() { return this.registerForm.controls }

	onSubmit() {
		this.submitted = true

		if (this.registerForm.valid) {
			this.loading = true
			this.subscriptions.push(this.api.register(this.registerForm.value).pipe(first()).subscribe(res => {
				this.loading = false
				if (res['status'] == "success") {
					this.message = { type: 'success', text: 'Inscription réussi' }
					setTimeout(() => {
						this.router.navigate(['/login'])
					}, 2000)
				} else
					this.message = { type: 'error', text: res['message'] }
			}))
		}
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}
}
