import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrinkWaterPageRoutingModule } from './drink-water-routing.module';

import { DrinkWaterPage } from './drink-water.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrinkWaterPageRoutingModule
  ],
  declarations: [DrinkWaterPage]
})
export class DrinkWaterPageModule {}
