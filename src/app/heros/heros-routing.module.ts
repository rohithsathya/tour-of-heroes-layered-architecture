import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerosListComponent } from './components/heros-list/heros-list.component';

const routes: Routes = [
  {
    path:'',
    component:HerosListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HerosRoutingModule { }
