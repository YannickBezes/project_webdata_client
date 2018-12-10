import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	keyword: string = '' // Create a variable which are the value of the input 
	date: Date;

	// Create an event to signal when the user whant to search something
	@Output() toSearch = new EventEmitter<string>()
	@Output() toSearchDate = new EventEmitter<string>()

	constructor() { }

	search_date() {
		this.toSearchDate.emit(encodeURIComponent(this.date.toLocaleDateString("en")))
	}

	ngOnInit() { }

	/**
	 * Emit a the keyword
	 */
	search() {
		this.toSearch.emit(this.keyword)
	}
}
