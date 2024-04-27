import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const masterRoutes: Routes = [
  {
    path: 'company',
    loadChildren: () =>
      import('./company/company.module').then((m) => m.CompanyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(masterRoutes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
