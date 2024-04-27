import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListComponent } from './list/company-list.component';
import { CompanyDetailComponent } from './detail/company-detail.component';


@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyDetailComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
