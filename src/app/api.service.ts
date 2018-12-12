import { Injectable, OnDestroy } from '@angular/core'
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import config from '../../config'
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class ApiService implements OnDestroy {
	private headers: HttpHeaders = new HttpHeaders()
	public connected: boolean = false
	private subscriptions: Subscription[] = []
	public current_user_subject: BehaviorSubject<any>;
    public current_user: Observable<any>;

	constructor(private http: HttpClient) {
		this.current_user_subject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')))
		this.current_user = this.current_user_subject.asObservable()
		if (this.current_user_value != null) {
			this.connected = true
			this.headers = this.headers.set('X-Auth-Token', this.current_user_subject.value['token'])
		}

		this.subscriptions.push(this.current_user_subject.subscribe(data => {
			localStorage.setItem('user', JSON.stringify(data))
		}))
	}

	public get current_user_value(): Object {
		let user = { ...this.current_user_subject.value }
		if(user['token'])
			delete user['token']
		return user
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => {
			sub.unsubscribe()
		});
	}

	/**
	 * Login user and get information of the user
	 * @param email email of the user
	 * @param password password of the user
	 */
	public login(email: string, password: string): Observable<any> {
		return this.http.post(`${config.API_URL}/login`, { email, password }).pipe(map(res => {
			if (res['status'] === 'success') {
				this.headers = this.headers.set('X-Auth-Token', res['data']['token']);
				localStorage.setItem('user', JSON.stringify({ ...res['data']['user'], token: res['data']['token'] })) // Get information of the user
				this.current_user_subject.next(res['data']['user'])
				this.connected = true
			}
			return res
		}))
	}

	public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user')
		this.current_user_subject.next(null)
		this.connected = false
	}

	public register(form): Observable<any> {
		return this.http.post(`${config.API_URL}/register`, { ...form })
	}
	
	// ------------ MEMBERS ------------
	/**
	 * Get members
	 */
	public get_members(): Observable<any> {
		return this.http.get(`${config.API_URL}/members`, { headers: this.headers })
	}

	/**
	 * Get member id
	 * @param _id id of the member
	 */
	public get_member_id(_id: string): Observable<any> {
		return this.http.get(`${config.API_URL}/member/${_id}`, { headers: this.headers })
	}

	/**
	 * Get ratio of the member
	 * @param _id id of the member
	 */
	public get_member_ration(_id: string): Observable<any> {
		return this.http.get(`${config.API_URL}/member/ration/${_id}`, { headers: this.headers })
	}

	/**
	 * Add a member
	 * @param member 
	 */
	public add_member(member: object): Observable<any> {
		return this.http.post(`${config.API_URL}/member`, { ...member },  { headers: this.headers })
	}

	/**
	 * Update a member
	 * @param member 
	 */
	public update_member(member: object): Observable<any> {
		return this.http.patch(`${config.API_URL}/member/${member['_id']}`, { ...member }, { headers: this.headers })
	}

	/**
	 * Delete a member
	 * @param member 
	 */
	public delete_member(_id: string): Observable<any> {
		return this.http.delete(`${config.API_URL}/member/${_id}`, { headers: this.headers })
	}
	// ------------ END ------------
 

	// ------------ PROPERTIES ------------
	/**
	 * Get all properties
	 */
	public get_properties(): Observable<any> {
		return this.http.get(`${config.API_URL}/properties`, { headers: this.headers })
	}

	/**
	 * Get a property
	 * @param _id id of the property
	 */
	public get_property(_id: string): Observable<any> {
		return this.http.get(`${config.API_URL}/property/${_id}`, { headers: this.headers })
	}

	/**
	 * Get all properties with this keyword
	 * @param keyword keyword
	 */
	public get_properties_by_keyword(keyword: string): Observable<any> {
		return this.http.get(`${config.API_URL}/properties/keyword/${keyword}`, { headers: this.headers })
	}

	/**
	 * Get all properties of a member
	 * @param email email of a member
	 */
	public get_properties_by_email(email: string): Observable<any> {
		return this.http.get(`${config.API_URL}/properties/owner/${email}`, { headers: this.headers })
	}

	/**
	 * Get properties by date
	 * @param date minimum date (format dd-mm-yyy AM)
	 */
	public get_properties_by_date(date: string): Observable<any> {
		return this.http.get(`${config.API_URL}/properties/date/${date}`, { headers: this.headers })
	}

	/**
	 * Add a property
	 * @param property 
	 */
	public add_property(property: object): Observable<any> {
		return this.http.post(`${config.API_URL}/property`, { ...property }, { headers: this.headers })
	}

	/**
	 * Delete a property
	 * @param _id 
	 */
	public delete_property(_id: string): Observable<any> {
		return this.http.delete(`${config.API_URL}/property/${_id}`, { headers: this.headers })
	}

	/**
	 * Update a property
	 * @param property 
	 */
	public update_property(property: object): Observable<any> {
		return this.http.patch(`${config.API_URL}/property/${property['_id']}`, { ...property }, { headers: this.headers })
	}

	/**
	 * Update uses of a property
	 * @param _id 
	 * @param uses 
	 */
	public update_property_uses(_id: string, uses: object): Observable<any> {
		return this.http.patch(`${config.API_URL}/property/uses/${_id}`, { uses }, { headers: this.headers })
	}

	/**
	 * 
	 * @param _id 
	 * @param disponibilities 
	 */
	public update_property_disponibilities(_id: string, disponibilities: object): Observable<any> {
		return this.http.patch(`${config.API_URL}/property/disponibilities/${_id}`, { disponibilities }, { headers: this.headers })
	}
	// ------------ END ------------


	// ------------ SERVICES ------------
		/**
	 * Get all services
	 */
	public get_services(): Observable<any> {
		return this.http.get(`${config.API_URL}/services`, { headers: this.headers })
	}

	/**
	 * Get a service
	 * @param _id id of the service
	 */
	public get_service(_id: string): Observable<any> {
		return this.http.get(`${config.API_URL}/service/${_id}`, { headers: this.headers })
	}

	/**
	 * Get all services with this keyword
	 * @param keywords keyword
	 */
	public get_services_by_keyword(keyword: string): Observable<any> {
		return this.http.get(`${config.API_URL}/services/keyword/${keyword}`, { headers: this.headers })
	}

	/**
	 * Get all services of a member
	 * @param email email of a member
	 */
	public get_services_by_email(email: string): Observable<any> {
		return this.http.get(`${config.API_URL}/services/owner/${email}`)
	}

	/**
	 * Get services by date
	 * @param date minimum date (format dd-mm-yyy AM)
	 */
	public get_services_by_date(date: string): Observable<any> {
		return this.http.get(`${config.API_URL}/services/date/${date}`, { headers: this.headers })
	}

	/**
	 * Add a service
	 * @param service 
	 */
	public add_service(service: object): Observable<any> {
		return this.http.post(`${config.API_URL}/service`, { ...service }, { headers: this.headers })
	}

	/**
	 * Delete a service
	 * @param _id 
	 */
	public delete_service(_id: string): Observable<any> {
		return this.http.delete(`${config.API_URL}/service/${_id}`, { headers: this.headers })
	}

	/**
	 * Update a service
	 * @param property 
	 */
	public update_service(service: object): Observable<any> {
		return this.http.patch(`${config.API_URL}/service/${service['_id']}`, { ...service }, { headers: this.headers })
	}

	/**
	 * Update uses of a service
	 * @param _id 
	 * @param uses 
	 */
	public update_service_uses(_id: string, uses: object): Observable<any> {
		return this.http.patch(`${config.API_URL}/service/uses/${_id}`, { uses }, { headers: this.headers })
	}

	/**
	 * 
	 * @param _id 
	 * @param disponibilities 
	 */
	public update_service_disponibilities(_id: string, disponibilities: object): Observable<any> {
		return this.http.patch(`${config.API_URL}/service/disponibilities/${_id}`, { disponibilities }, { headers: this.headers })
	}
	// ------------ END ------------
}
