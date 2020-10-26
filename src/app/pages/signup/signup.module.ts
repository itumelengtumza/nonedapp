import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SignupPageRoutingModule,
    ComponentsModule, 
    FormsModule, 
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
