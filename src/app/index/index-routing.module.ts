import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPage } from './index.page';
import { IndexGuard } from '../guards/index.guard';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    canActivate: [IndexGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
        import('../pages/login/login.module').then(m => m.LoginPageModule)
      },
      {
      path: 'login',
      loadChildren: () =>
      import('../pages/login/login.module').then(m => m.LoginPageModule)
      },
      {
      path: 'signup',
      loadChildren: () =>
      import('../pages/signup/signup.module').then(m => m.SignupPageModule)
      }
      ,
      {
        path: 'reset-password',
        loadChildren: () => 
        import('../pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
