import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckUpsPageRoutingModule } from './check-ups-routing.module';

import { CheckUpsPage } from './check-ups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckUpsPageRoutingModule
  ],
  declarations: [CheckUpsPage]
})
export class CheckUpsPageModule {}
