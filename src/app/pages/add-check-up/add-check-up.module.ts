import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCheckUpPageRoutingModule } from './add-check-up-routing.module';

import { AddCheckUpPage } from './add-check-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCheckUpPageRoutingModule
  ],
  declarations: [AddCheckUpPage]
})
export class AddCheckUpPageModule {}
