import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolsPage } from './tools.page';

const routes: Routes = [
  {
    path: '',
    component: ToolsPage,
  },
  {
    path: 'weight-info',
    loadChildren: () => import('../../pages/weight-info/weight-info.module').then( m => m.WeightInfoPageModule)
  },
  {
    path: 'weight',
    loadChildren: () => import('../../pages/weight/weight.module').then( m => m.WeightPageModule)
  },
  {
    path: 'checklists',
    loadChildren: () => import('../../pages/checklists/checklists.module').then( m => m.ChecklistsPageModule)
  },
  {
    path: 'check-ups',
    loadChildren: () => import('../../pages/check-ups/check-ups.module').then( m => m.CheckUpsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsPageRoutingModule {}
