import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightPageRoutingModule } from './weight-routing.module';

import { WeightPage } from './weight.page';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightPageRoutingModule,
    RoundProgressModule
  ],
  declarations: [WeightPage]
})
export class WeightPageModule {}
