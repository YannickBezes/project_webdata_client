import { Component, Input, OnChanges, ViewChild, TemplateRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'
import { CalendarEvent, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar'
import { isSameDay, isSameMonth } from 'date-fns'
import { ApiService } from 'src/app/api.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router'
import { Subject, Subscription } from 'rxjs'


@Component({
	selector: 'app-disponibility',
	templateUrl: './disponibility.component.html',
	styleUrls: ['./disponibility.component.css'],
})
export class DisponibilityComponent implements OnInit, OnChanges, OnDestroy {
	subscriptions: Subscription[] = []
	@Input() item: object = {}
	@Input() edit: boolean = false

	@ViewChild('modalContent')
	modalContent: TemplateRef<any>

	@ViewChild('modalAddUse')
	modalAddUse: TemplateRef<any>
	@Input() successRequest: Subject<boolean>

	view: CalendarView = CalendarView.Month
	CalendarView = CalendarView
	viewDate = new Date()
	events: CalendarEvent[] = []
	actions: CalendarEventAction[] = [{
		label: '<i class="fa fa-fw fa-check"></i>',
		onClick: ({ event }: { event: CalendarEvent }): void => {
			this.handleEvent('selected', event)
		}
	}]
	activeDayIsOpen: boolean = false
	modalData: object = {}
	@Output() onDateSelected = new EventEmitter<string>()
	selectedDate: string
	success: boolean
	refresh: Subject<any> = new Subject()

	constructor(private api: ApiService, private modal: NgbModal, private router: Router) { }

	ngOnInit() {
		if (!this.edit) {
			this.subscriptions.push(this.successRequest.subscribe(res => {
				this.success = res
				this.modal.open(this.modalAddUse)
				// Update events
				this.activeDayIsOpen = false
				let newEvents = []
				this.events.forEach(event => {
					if (event.id.toString() != this.selectedDate)
						newEvents.push(event)
				})
				this.events = newEvents
				this.refresh.next()
			}))
		} else {
			this.subscriptions.push(this.successRequest.subscribe(res => {
				this.events = []
				let dates = this.getDateUnused()
				dates.forEach(date => {
					this.events.push({
						start: new Date(date.split(' ')[0] + ' ' + (date.split(' ')[1] === 'AM' ? "00:00" : "12:00")),
						end: new Date(date.split(' ')[0] + ' ' + (date.split(' ')[1] === 'AM' ? "12:00" : "23:00")),
						title: `${this.item['name']} disponible`,
						color: {
							primary: '#e94a77',
							secondary: '#e94a77'
						},
						actions: this.edit ? null : this.actions,
						id: date,
						draggable: this.edit
					})
				})
				this.refresh.next()
			}))
		}
	}

	ngOnChanges() {
		if (this.item) {
			this.events = []
			let dates = this.getDateUnused()
			dates.forEach(date => {
				this.events.push({
					start: new Date(date.split(' ')[0] + ' ' + (date.split(' ')[1] === 'AM' ? "00:00" : "12:00")),
					end: new Date(date.split(' ')[0] + ' ' + (date.split(' ')[1] === 'AM' ? "12:00" : "23:00")),
					title: `${this.item['name']} disponible`,
					color: {
						primary: '#e94a77',
						secondary: '#e94a77'
					},
					actions: this.edit ? null : this.actions,
					id: date,
					draggable: this.edit
				})
			})
		}
	}

	clickDay({ date, events }: { date: Date, events: CalendarEvent[] }): void {
		if (!this.edit) {
			if (isSameMonth(date, this.viewDate)) {
				if (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true || events.length === 0) {
					this.activeDayIsOpen = false
				} else {
					this.viewDate = date
					this.activeDayIsOpen = true
				}
			}
		}
	}

	handleEvent(action: string, event: CalendarEvent): void {
		if (this.api.connected) {
			this.modalData['status'] = 1
			this.selectedDate = event.id.toString()
			this.modal.open(this.modalContent, { size: 'lg' })
		} else {
			this.modalData['status'] = 0
			this.modal.open(this.modalContent, { size: 'lg' })
		}
	}

	clickedYes() {
		this.modal.dismissAll()
		this.onDateSelected.emit(this.selectedDate)
	}

	goToLogin() {
		this.modal.dismissAll()
		this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } })
	}

	getDateUnused() {
		let dates = []
		this.item['disponibilities'].forEach(date => {
			let exist = false
			this.item['uses'].forEach(use => {
				if (use['disponibility'] == date) {
					exist = true
				}
			})

			if (!exist) {
				dates.push(date)
			}
		})
		return dates
	}

	eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
		event.start = newStart
		event.end = newEnd
		
		// Parse disponibilities
		let new_dispo = []
		this.item['disponibilities'].forEach(dispo => {
			if (dispo === event.id) {
				let date = event.start.toLocaleString("en")
				new_dispo.push(`${date.split(', ')[0]} ${date.split(' ')[2]}`)
			} else {
				new_dispo.push(dispo)
			}
		})
		this.item['disponibilities'].forEach(dispo => {
			this.item['uses'].forEach(use => {
				if (use['disponibility'] == dispo) {
					new_dispo.push(dispo)
				}
			})
		})
		this.item['disponibilities'] = new_dispo
		this.successRequest.next()	
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}
}
