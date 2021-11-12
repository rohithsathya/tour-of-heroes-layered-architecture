import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HerosRoutingModule } from './heros-routing.module';
import { HeroViewComponent } from './components/hero-view/hero-view.component';
import { HerosListComponent } from './components/heros-list/heros-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    HeroViewComponent,
    HerosListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HerosRoutingModule
  ]
})
export class HerosModule { }
