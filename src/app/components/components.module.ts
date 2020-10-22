import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { StartButtonComponent } from './start-button/start-button.component';
import { LogoComponent } from './logo/logo.component';


@NgModule({
  declarations: [SlidesComponent, StartButtonComponent, LogoComponent],
  exports: [SlidesComponent, StartButtonComponent, LogoComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
