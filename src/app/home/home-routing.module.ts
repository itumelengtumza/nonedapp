import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomeGuard } from '../guards/home.guard';
import { UserDataResolver } from '../resolvers/user-data.resolver';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [HomeGuard],
    resolve:{
      userData: UserDataResolver
      },
    children: [
      {
      path: 'home',
      loadChildren: () =>
      import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
      path: 'tools',
      loadChildren: () =>
      import('../pages/tools/tools.module').then(
      m => m.ToolsPageModule
      )
      },
      {
      path: 'articles',
      loadChildren: () =>
      import('../pages/articles/articles.module').then(
      m => m.ArticlesPageModule
      )
      },
      {
      path: 'location',
      loadChildren: () =>
      import('../pages/location/location.module').then(
      m => m.LocationPageModule
      )
      },
      {
      path: 'drink-water',
      loadChildren: () =>
      import('../pages/drink-water/drink-water.module').then(
      m => m.DrinkWaterPageModule
      )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
