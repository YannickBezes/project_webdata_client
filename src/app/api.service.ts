import { Injectable } from '@angular/core'
import { Observable, Subscribable, Subscription, observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private url: String = 'http://localhost:3000'
	private headers: HttpHeaders = new HttpHeaders()
	public connected: Boolean = false

	constructor(private http: HttpClient) { }

	public is_connected(): Observable<any> {
		return Observable.create(observer => {
			observer.next(this.connected)
		})
	}
	/**
	 * Login
	 * @param email
	 * @param password
	 */
	public async login(email: String, password: String): Promise<any> {
		const res = await this.http.post(`${this.url}/login`, { email, password }).toPromise();
		if (res['status'] === 'success') {
			this.headers = this.headers.set('X-Auth-Token', res['data']['token']);
			this.connected = true;
			return true;
		}
		return false;
	}

	/**
	 * Get properties
	 */
	public get_properties(): Observable<any> {
		return this.http.get(`${this.url}/properties`, { headers: this.headers })
	}

	/**
	 * Get members
	 */
	public get_members(): Observable<any> {
		return this.http.get(`${this.url}/members`, { headers: this.headers })
	}

	public get_member_id(_id: string): Observable<any> {
		return this.http.get(`${this.url}/member`, { params: { ['_id']: _id } , headers: this.headers })
	}

}
