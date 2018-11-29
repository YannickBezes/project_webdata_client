import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { SearchComponent } from '../search/search.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, SearchComponent],
  imports: [
    CommonModule,
  ]
})
export class HomeModule { }
