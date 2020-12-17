import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightInfoPageRoutingModule } from './weight-info-routing.module';

import { WeightInfoPage } from './weight-info.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightInfoPageRoutingModule,
    ComponentsModule, 
    ReactiveFormsModule,
  ],
  declarations: [WeightInfoPage]
})
export class WeightInfoPageModule {}
