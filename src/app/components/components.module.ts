import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { SettingsComponent } from './settings/settings.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ LogoComponent, SettingsComponent],
  exports: [ LogoComponent, SettingsComponent],
  imports: [
    CommonModule, IonicModule
  ]
})
export class ComponentsModule { }
