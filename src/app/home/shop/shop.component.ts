import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
	@Input() list: Object[]
	constructor() { }

	ngOnInit() { }

}
