import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PregnancyByWeeksPage } from './pregnancy-by-weeks.page';

const routes: Routes = [
  {
    path: '',
    component: PregnancyByWeeksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PregnancyByWeeksPageRoutingModule {}
