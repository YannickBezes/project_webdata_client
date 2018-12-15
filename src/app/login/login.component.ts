import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { first } from 'rxjs/operators'

import { ApiService } from '../api.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = []
	loginForm: FormGroup
	loading = false
	submitted = false
	returnUrl: string
	message: object

	constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private api: ApiService) {
		// redirect to home if already logged in
		if (this.api.connected)
			this.router.navigate(['/'])
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		})

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
	}

	// convenience getter for easy access to form fields
	get form() { return this.loginForm.controls }

	onSubmit() {
		this.submitted = true

		if (this.loginForm.valid) {
			this.loading = true
			this.subscriptions.push(this.api.login(this.form.email.value, this.form.password.value).pipe(first()).subscribe(data => {
				this.loading = false
				if (data['status'] == 'success')
					this.router.navigate([this.returnUrl])
				else
					this.message = { type: 'error', 'text': data['message'] }
					
			}))
		}
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}
}
