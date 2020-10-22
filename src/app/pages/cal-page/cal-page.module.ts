import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalPagePageRoutingModule } from './cal-page-routing.module';

import { CalPagePage } from './cal-page.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalPagePageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [CalPagePage]
})
export class CalPagePageModule {}
