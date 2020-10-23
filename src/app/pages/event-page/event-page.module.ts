import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPagePageRoutingModule } from './event-page-routing.module';

import { EventPagePage } from './event-page.page';

import { NgCalendarModule } from 'ionic2-calendar';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPagePageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [EventPagePage]
})
export class EventPagePageModule {}
