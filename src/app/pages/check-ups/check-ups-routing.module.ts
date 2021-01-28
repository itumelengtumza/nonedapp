import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckUpsPage } from './check-ups.page';

const routes: Routes = [
  {
    path: '',
    component: CheckUpsPage
  },
  {
    path: 'check-up-detail/:id',
    loadChildren: () => import('../../pages/check-up-detail/check-up-detail.module').then( m => m.CheckUpDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckUpsPageRoutingModule {}
