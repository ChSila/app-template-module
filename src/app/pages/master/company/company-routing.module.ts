import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './list/company-list.component';
import { CompanyDetailComponent } from './detail/company-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent
  },
  {
    path: 'create',
    component: CompanyDetailComponent
  },
  {
    path: ':id',
    component: CompanyDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
