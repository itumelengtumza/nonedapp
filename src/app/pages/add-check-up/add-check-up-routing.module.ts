import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCheckUpPage } from './add-check-up.page';

const routes: Routes = [
  {
    path: '',
    component: AddCheckUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCheckUpPageRoutingModule {}
