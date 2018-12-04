import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	keyword: string = '' // Create a variable which are the value of the input 

	// Create an event to signal when the user whant to search something
	@Output() toSearch = new EventEmitter<string>()

	constructor() { }

	ngOnInit() { }

	/**
	 * Emit a the keyword
	 */
	search() {
		this.toSearch.emit(this.keyword)
	}
}
