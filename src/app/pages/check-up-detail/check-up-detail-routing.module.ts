import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckUpDetailPage } from './check-up-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CheckUpDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckUpDetailPageRoutingModule {}
