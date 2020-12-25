import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckUpDetailPageRoutingModule } from './check-up-detail-routing.module';

import { CheckUpDetailPage } from './check-up-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckUpDetailPageRoutingModule
  ],
  declarations: [CheckUpDetailPage]
})
export class CheckUpDetailPageModule {}
