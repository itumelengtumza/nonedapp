import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [ LogoComponent, SettingsComponent],
  exports: [ LogoComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
