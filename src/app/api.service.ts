import { Injectable } from '@angular/core'
import { Observable, Subscribable, Subscription, observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import config from '../../config'
import { EventEmitter } from 'events';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private headers: HttpHeaders = new HttpHeaders()
	public connected: Boolean = false
	public user: Object

	constructor(private http: HttpClient) { }

	/**
	 * Login user and get information of the user
	 * @param email
	 * @param password
	 */
	public async login(email: String, password: String): Promise<any> {
		const res = await this.http.post(`${config.API_URL}/login`, { email, password }).toPromise();
		if (res['status'] === 'success') {
			this.headers = this.headers.set('X-Auth-Token', res['data']['token']);
			this.user = res['data']['user'] // Get information of the user
			return this.connected = true;
		}
		return false;
	}

	/**
	 * Get properties
	 */
	public get_properties(): Observable<any> {
		return this.http.get(`${config.API_URL}/properties`, { headers: this.headers })
	}

	/**
	 * Get members
	 */
	public get_members(): Observable<any> {
		return this.http.get(`${config.API_URL}/members`, { headers: this.headers })
	}

	public get_member_id(_id: string): Observable<any> {
		return this.http.get(`${config.API_URL}/member`, { params: { ['_id']: _id } , headers: this.headers })
	}

}
