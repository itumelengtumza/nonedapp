import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
    
  }
  ,
  {
    path: 'pregnancy-by-weeks/:mom_baby',
    loadChildren: () => import('../../pages/pregnancy-by-weeks/pregnancy-by-weeks.module').then( m => m.PregnancyByWeeksPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
