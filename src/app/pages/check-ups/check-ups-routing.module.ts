import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckUpsPage } from './check-ups.page';

const routes: Routes = [
  {
    path: '',
    component: CheckUpsPage
  },
  {
    path: 'add-check-up',
    loadChildren: () => import('../../pages/add-check-up/add-check-up.module').then( m => m.AddCheckUpPageModule)
  },
  {
    path: 'check-up-detail',
    loadChildren: () => import('../../pages/check-up-detail/check-up-detail.module').then( m => m.CheckUpDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckUpsPageRoutingModule {}
