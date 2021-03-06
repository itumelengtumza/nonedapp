import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'cal-page',
    loadChildren: () => import('./pages/cal-page/cal-page.module').then( m => m.CalPagePageModule)
  },
  {
    path: 'event-modal',
    loadChildren: () => import('./pages/event-modal/event-modal.module').then( m => m.EventModalPageModule)
  },
  {
    path: 'event-page',
    loadChildren: () => import('./pages/event-page/event-page.module').then( m => m.EventPagePageModule)
  },
  {
    path: 'add-tasks',
    loadChildren: () => import('./pages/add-tasks/add-tasks.module').then( m => m.AddTasksPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
