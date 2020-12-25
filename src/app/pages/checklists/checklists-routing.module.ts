import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistsPage } from './checklists.page';

const routes: Routes = [
  {
    path: '',
    component: ChecklistsPage
  },
  {
    path: 'checklist/:id',
    loadChildren: () => import('../../pages/checklist/checklist.module').then( m => m.ChecklistPageModule)
  },
  {
    path: 'addchecklist/:id',
    loadChildren: () => import('../../pages/addchecklist/addchecklist.module').then( m => m.AddchecklistPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChecklistsPageRoutingModule {}
