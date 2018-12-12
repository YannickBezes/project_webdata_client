import { Component, Input, OnChanges, ViewChild, TemplateRef, Output, EventEmitter, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { ApiService } from 'src/app/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
	selector: 'app-disponibility',
	templateUrl: './disponibility.component.html',
	styleUrls: ['./disponibility.component.css'],
})
export class DisponibilityComponent implements OnInit, OnChanges {
	@Input() item: object = {}

	@ViewChild('modalContent')
	modalContent: TemplateRef<any>;
	
	@ViewChild('modalAddUse')
	modalAddUse: TemplateRef<any>
	@Input() successAddUse: Subject<boolean>

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
	activeDayIsOpen: boolean = false;
	modalData: object = {}
	@Output() onDateSelected = new EventEmitter<string>()
	selectedDate: string
	success: boolean
	refresh: Subject<any> = new Subject()

	constructor(private api: ApiService, private modal: NgbModal, private router: Router) {	}

	ngOnInit() {
		this.successAddUse.subscribe(res => {
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
		})
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
					actions: this.actions,
					id: date
				})
			})
		}
	}

	clickDay({ date, events }: { date: Date; events: CalendarEvent[] }): void {
		if (isSameMonth(date, this.viewDate)) {
			if (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true || events.length === 0) {
					this.activeDayIsOpen = false;
			} else {
				this.viewDate = date;
				this.activeDayIsOpen = true;
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
			this.modal.open(this.modalContent, { size: 'lg'})
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

}
