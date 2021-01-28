import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckupListComponent } from './checkup-list.component';

@NgModule({
  declarations: [CheckupListComponent],
  exports: [ CheckupListComponent],
  imports: [ CommonModule],
})
export class CheckupListModule { }
