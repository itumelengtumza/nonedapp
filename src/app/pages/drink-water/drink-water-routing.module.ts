import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrinkWaterPage } from './drink-water.page';

const routes: Routes = [
  {
    path: '',
    component: DrinkWaterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrinkWaterPageRoutingModule {}
