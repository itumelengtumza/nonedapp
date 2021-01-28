import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PregnancyByWeeksPageRoutingModule } from './pregnancy-by-weeks-routing.module';

import { PregnancyByWeeksPage } from './pregnancy-by-weeks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PregnancyByWeeksPageRoutingModule
  ],
  declarations: [PregnancyByWeeksPage]
})
export class PregnancyByWeeksPageModule {}
