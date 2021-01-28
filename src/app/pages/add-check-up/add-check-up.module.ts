import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCheckUpPageRoutingModule } from './add-check-up-routing.module';

import { AddCheckUpPage } from './add-check-up.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CheckupListModule } from 'src/app/components/checkup-list/checkup-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCheckUpPageRoutingModule,
    ComponentsModule,  
    ReactiveFormsModule,
    CheckupListModule
  ],
  declarations: [AddCheckUpPage]
})
export class AddCheckUpPageModule {}
