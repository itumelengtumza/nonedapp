import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPagePage } from './event-page.page';

const routes: Routes = [
  {
    path: '',
    component: EventPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPagePageRoutingModule {}
