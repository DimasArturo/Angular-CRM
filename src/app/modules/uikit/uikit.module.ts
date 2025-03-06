import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UikitRoutingModule } from './uikit-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UikitRoutingModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class UikitModule { }
